import sql from 'mssql';
import config from '../config'
const dbSettings={
    user: 'admin123',
    password: 'Blunaosi123',
    server: 'proyectobluna.database.windows.net',
    database: 'db_proyectobluna',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },

};


export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch(error){
        console.error(error);
    }
}

export { sql };