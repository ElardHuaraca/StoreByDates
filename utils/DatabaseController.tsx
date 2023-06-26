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
    const [results, _] = await connect.execute('SELECT id, name FROM store')

    return results
}

export async function StoreById(id: number) {
    const [results, _] = await connect.execute('SELECT id, name FROM store WHERE id = ? JOIN type_store ON store.type_id = type_store.id', [id])

    return results
}
