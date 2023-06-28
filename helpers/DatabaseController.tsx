import MYSQL from 'mysql2'
import { Sequelize } from 'sequelize'

const { host, username, password, database } = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

const connection = MYSQL.createPool({
    host: host,
    user: username,
    password: password,
    database: database,
    waitForConnections: true,
    connectionLimit: 10,
})

const connect = connection.promise()

export const sequelize = new Sequelize(database!, username!, password, { dialect: 'mysql' })

export async function AllStores() {
    const [results, _] = await connect.execute('SELECT id, name FROM store')

    return results
}

export async function StoreById(id: number) {
    const [results, _] = await connect.execute('SELECT ip,type_name FROM store LEFT JOIN type_store ON store.type_id = type_store.id WHERE store.id = ? ', [id])

    return results
}
