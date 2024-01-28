import oracledb from 'oracledb';
import { IDatabaseService } from './IDatabaseService';

export class OracleDatabaseService implements IDatabaseService {
  private static instance: OracleDatabaseService;
  private connection: oracledb.Connection | null = null;

  private constructor(
    private user: string,
    private password: string,
    private connectString: string,
  ) { }

  public static getInstance(): OracleDatabaseService {
    if (!OracleDatabaseService.instance) {
      OracleDatabaseService.instance = new OracleDatabaseService(

        process.env.ORACLE_USER || '',
        process.env.ORACLE_PASSWORD || '',
        process.env.DB_CONNECTION_STRING || ''
      );
    }
    return OracleDatabaseService.instance;
  }

  public async getConnection(): Promise<oracledb.Connection> {
    // Si la conexión existe, intenta usarla. Si hay un error, intenta reconectar.
    if (this.connection) {
      try {
        await this.connection.ping();
        return this.connection;
      } catch (error) {
        console.warn('La conexión con la base de datos se perdió. Intentando reconectar...');
        // Si hay un error al intentar usar la conexión existente, cierra esa conexión
        await this.closeConnection();
      }
    }

    // Si no hay conexión o la conexión anterior falló, intenta establecer una nueva conexión
    try {
      this.connection = await oracledb.getConnection({
        user: this.user,
        password: this.password,
        connectString: this.connectString,
      });
      return this.connection;
    } catch (err) {
      console.error("Error al intentar establecer conexión:", err);
      await this.closeConnection();
      throw err;
    }
  }

  public async execute(sql: string, params?: any): Promise<oracledb.Result<any>> {
    const connection = await this.getConnection();
    try {
      const result = await connection.execute(sql, params);
      return result;
    } catch (err) {
      console.error("Error in Oracle service:", err);
      throw err;
    }
  }

  public async commitTransaction(): Promise<void> {
    const connection = await this.getConnection();
    try {
      await connection.commit();
    } catch (err) {
      console.error("Error while trying to commit transaction:", err);
      throw err;
    }
  }

  public async rollbackTransaction(): Promise<void> {
    const connection = await this.getConnection();
    try {
      await connection.rollback();
    } catch (err) {
      console.error("Error while trying to rollback transaction:", err);
      throw err;
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.close();
        this.connection = null;
      } catch (err) {
        console.error("Error while trying to close connection:", err);
      }
    }
  }
}
