import oracleDb, { Connection } from 'oracledb'; 

export const createOracleDbConnection = async (): Promise<Connection> => {
    try {
        const connection = await oracleDb.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING
        });

        return connection; 
    } catch (error) {
        console.error('Error al crear la conexión de Oracle:', error);
        throw error;
    }
};
