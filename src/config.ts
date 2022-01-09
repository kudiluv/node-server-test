import { Options } from "sequelize/types";
const env = process.env;


const db:Options = {
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_DATABASE,
    dialect: "mysql",
}

export default {
    db,
    salt: env.SALT,
    app: {
        port: env.APP_PORT || 5000
    },
}

