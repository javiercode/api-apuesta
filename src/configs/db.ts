import { DataSource,createConnections } from "typeorm";
import { Apuesta } from "../entities/Apuesta";
import { Equipo } from "../entities/Equipo";
import { Grupo } from "../entities/Grupo";
import { Partido } from "../entities/Partido";
import { Rol } from "../entities/Rol";
import { RolUser } from "../entities/RolUser";
import { User } from "../entities/User";

export const MysqlDataSource = new DataSource({
    // "type": "mysql",
    // "host": process.env.MYSQLDB_HOST,
    // "port": Number(process.env.MYSQLDB_PORT),
    // "username": process.env.MYSQLDB_USR,
    // "password": process.env.MYSQLDB_PSW,
    // "database": process.env.MYSQLDB,
    // "synchronize": true,
    // "logging": false,
    // "ssl": false,
    // "extra": {
    //     ssl: {
    //         rejectUnauthorized: true,
    //     },
    // },


    type: 'mysql',
    host: process.env.MYSQLDB_HOST,
    port: Number(process.env.MYSQLDB_PORT),
    username: process.env.MYSQLDB_USR,
    password: process.env.MYSQLDB_PSW,
    database: process.env.MYSQLDB,
    synchronize: false,
    logging: false,
    ssl:false,
    extra: {
         ssl: {
             rejectUnauthorized: true,
         },
     },
    entities: [
        // "./src/entities/*.ts"
Apuesta,
Equipo,
Grupo,
Partido,
Rol,
RolUser,
User,
    ]
})