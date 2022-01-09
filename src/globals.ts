import { Sequelize } from 'sequelize';
import { UserInctance } from "./models/user";


declare global {
    namespace Express {
        interface User extends UserInctance {}
    }
}

export {}