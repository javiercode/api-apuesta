import { DataSource,createConnections } from "typeorm";

export const MongoDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    database: process.env.MONGO_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        "./src/entities/*.ts"
        // User,RolUsuario,RolAplicacion,Cliente,Tarea,Imagen,Movimiento,Jornada,Turno,Asignacion
    ],
    subscribers: [
        // "src/subscriber/*.js"
    ],
    migrations: [
        // "src/migration/*.js"
    ],
})

