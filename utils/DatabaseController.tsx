import MYSQL from 'mysql2'

const connection = MYSQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export async function AllStores() {
    /* return results */
    return new Promise<Store[]>((resolve, reject) => {
        connection.connect((err) => {
            if (err) reject(err)

            connection.query('SELECT * FROM stores', (err, results, fields) => {
                if (err) reject(err)
                resolve(results as Store[])
            })

        })
    })
}