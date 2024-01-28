import { IDbConnection } from "./IDbConnection";
import { IUnitOfWork } from "./IUnitOfWork";
import { OracleDbConnection } from "./OracleDbConnection";

export class OracleUnitOfWork implements IUnitOfWork {
    private dbConnection: OracleDbConnection;

    constructor(dbConnection: OracleDbConnection) {
        this.dbConnection = dbConnection;
    }

    getConnection(): IDbConnection {
        return this.dbConnection;
    }

    async startTransaction(): Promise<void> {
        try {
            await this.dbConnection.beginTransaction();
        } catch (error) {
            console.error('Error starting transaction:', error);
            throw new Error('Failed to start transaction');
        }
    }
    async beginTransaction(): Promise<void> {
        // Si Oracle maneja las transacciones automáticamente, este método podría estar vacío
        // O, si necesitas hacer algo específico para empezar una transacción, añádelo aquí
    }
    async commitTransaction(): Promise<void> {
        try {
            await this.dbConnection.commit();
        } catch (error) {
            console.error('Error committing transaction:', error);
            throw new Error('Failed to commit transaction');
        }
    }

    async rollbackTransaction(): Promise<void> {
        try {
            await this.dbConnection.rollback();
        } catch (error) {
            console.error('Error rolling back transaction:', error);
            // No lanzar excepción en rollback para evitar sobrescribir errores originales
        }
    }
}
