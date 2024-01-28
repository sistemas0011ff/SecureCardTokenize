import { IDbConnection } from "./IDbConnection";

export interface IUnitOfWork {
    getConnection(): IDbConnection;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>; 
}
