import {Sequelize, DataTypes, Model} from "sequelize";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

export interface UserInctance extends Model<UserAttributes>, UserAttributes{}

module.exports = (sequelize: Sequelize) => {
    const User = sequelize.define<UserInctance>('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return User;
}