import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['entities/*.ts'],
    synchronize: false
}

export = connectionOptions;