import {Model, Sequelize} from "sequelize";
import config from "../config";
import {utils} from "../utils";
import {Express} from "express";

const sequelize = new Sequelize(config.db);

const modelsPath = utils.readdirRecursiveSync(`${__dirname}/../models`);

modelsPath.forEach((path) => {
    require(path)(sequelize);
})

module.exports = function useDatabase(app: Express){
    global.sequelize = sequelize;
};
