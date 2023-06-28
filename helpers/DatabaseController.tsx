import { StoreSequelize, TypeStoreSequelize } from '@/Entity'
import { sequelize } from '@/Entity/SequelizeDB'
import MYSQL from 'mysql2'

const connection = MYSQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
})

const connect = connection.promise()

export async function InitDatabaseAndModels() {
    await connect.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    await sequelize.sync()
    await StoreSequelize.findAll()
    await TypeStoreSequelize.findAll()

}

export async function AllStores() {
    const results = await StoreSequelize.findAll()
    return results.map(res => {
        const data: IStoreModel = {
            id: res.id,
            name: res.name,
        }
        return data
    })
}

export async function StoreById(id: number) {
    const [results, _] = await connect.execute('SELECT ip,type_name FROM store LEFT JOIN type_store ON store.type_id = type_store.id WHERE store.id = ? ', [id])

    return results
}
