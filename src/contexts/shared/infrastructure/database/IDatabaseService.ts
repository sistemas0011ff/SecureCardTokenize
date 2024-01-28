import oracledb from "oracledb";

// export interface IDatabaseService {
//     getConnection(): Promise<any>;
//     execute(sql: string, params?: any): Promise<oracledb.Result<any>>;
//     commitTransaction(): Promise<void>;
//     rollbackTransaction(): Promise<void>;
//     closeConnection(): Promise<void>;
//   }
 

// export interface IDatabaseService {
//   execute(sql: string, params?: any): Promise<oracledb.Result<any>>;
//   commitTransaction(): Promise<void>;
//   rollbackTransaction(): Promise<void>;
//   closeConnection(): Promise<void>;
//   closePool?(): Promise<void>; // Opcional: si decides exponer la capacidad de cerrar el pool.
//   writeToClob(clob: oracledb.Lob, data: string): Promise<void>;
//   executePlSql(params: any): Promise<void>;
//   startTransaction(): Promise<void>;
// }
export interface IDatabaseService {
  getConnection(): Promise<oracledb.Connection>;
  execute(sql: string, params?: any): Promise<oracledb.Result<any>>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  closeConnection(): Promise<void>;
  closePool?(): Promise<void>; // Opcional: si decides exponer la capacidad de cerrar el pool.
}