import { Connection } from 'oracledb';
import { IDbConnection } from './IDbConnection';

export class OracleDbConnection implements IDbConnection {
    private connection: Connection;
 
    constructor(connection: Connection) {
        console.log('Instancia de OracleDbConnection recibida en OracleUnitOfWork');

        this.connection = connection;
    }
    async execute(query: string, params: any[]): Promise<any> {
        return this.connection.execute(query, params, { autoCommit: false });
    }


    async beginTransaction(): Promise<void> {
        // Oracle inicia transacciones automáticamente
    }

    async commit(): Promise<void> {
        await this.connection.commit();
    }

    async rollback(): Promise<void> {
        await this.connection.rollback();
    }

    async close(): Promise<void> {
        await this.connection.close();
    }
}
