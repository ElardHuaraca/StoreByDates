import MYSQL from 'mysql2'

const connection = MYSQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
})

const connect = connection.promise()

export async function AllStores() {

    const [results, _] = await connect.query('SELECT * FROM stores')

    return results
}