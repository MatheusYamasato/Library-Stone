import knex from 'knex'

export const config = {
    client: 'pg',
    connection: {
        host: process.env.BD_HOST || 'localhost',
        port: (process.env.BD_PORT || 5432),
        user: process.env.BD_USER || 'postgres',
        password: process.env.BD_PASSWORD || 'postgrespassword',
        database: process.env.BD_DATABASE || ''
    }
}

export const connect = () => {
    let api = knex({
        ...config,
    })


    return api
}