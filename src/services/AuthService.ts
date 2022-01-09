import argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
const models = global.sequelize.models;
import config from "../config";

class AuthService {
    public static async signUp(email: string, password: string) {

        const passwordHashed = await argon2.hash(password);
        
        const userRecord = await models.User.findOne({
            where: {
                email
            }
        });
        if (userRecord) {
            throw new Error('User already exist');
        }

        const newUserRecord = await models.User.create({
            email,
            password: passwordHashed,
        });

        return {
            token: this.generateJWT(newUserRecord)
        }
    }

    public static async login(email: string, password: string) {
        
        const userRecord = await models.User.findOne({
            where: {
                email
            }
        });
        if (!userRecord) {
            throw new Error('User not Found');
        }

        const correctPassword = await argon2.verify(userRecord.password, password);
        if (!correctPassword) {
            throw new Error('Incorrect password')
        }

        return {
            token: this.generateJWT(userRecord)
        }

    }

    private static generateJWT(user) { 

        const data = {
            id: user.id,
            email: user.email,
        }
        const signature = config.salt;
        const expiration = '6h';

        return `Bearer ${jwt.sign({data}, signature, {expiresIn: expiration})}`;
    }
}

export default AuthService;