import { StoreSequelize, TypeStoreSequelize } from '@/Entity'
import { sequelize } from '@/Entity/SequelizeDB'
import MYSQL from 'mysql2'
import { STRUCTURES } from './StoreSuport'

const connection = MYSQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
})

const connect = connection.promise()

export async function InitDatabaseAndModels() {
    connection.getConnection((_, conn) => {
        conn.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        conn.changeUser({ database: process.env.DB_NAME })
        conn.release()
    })

    await sequelize.sync()
    await StoreSequelize.findAll()
    await TypeStoreSequelize.findAll()
    STRUCTURES.forEach(async (structure) => {
        await connect.execute(`INSERT INTO type_stores(name) SELECT * FROM (SELECT "${structure.types}") AS tmp WHERE NOT EXISTS(SELECT name FROM type_stores WHERE name="${structure.types}") LIMIT 1`)
    })
}

export async function AllStores() {
    const results = await StoreSequelize.findAll({
        include: [TypeStoreSequelize]
    })

    return results
}

export async function StoreById(id: string) {
    const results = await StoreSequelize.findOne({
        where: { id },
        include: [TypeStoreSequelize]
    })

    return results
}

export async function AllTypeStore() {
    const results = await TypeStoreSequelize.findAll()

    return results
}
