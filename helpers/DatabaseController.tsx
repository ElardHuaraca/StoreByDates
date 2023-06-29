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

    return results
}

export async function StoreById(id: string) {
    const results = await StoreSequelize.findOne({
        where: { id },
        include: [TypeStoreSequelize]
    })

    return results
}
