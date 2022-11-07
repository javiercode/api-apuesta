import { DataSource,createConnections } from "typeorm";

export const MongoDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    database: process.env.MONGO_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
        "./src/entities/*.ts"
    ],
    subscribers: [
        // "src/subscriber/*.js"
    ],
    migrations: [
        // "src/migration/*.js"
    ],
})

