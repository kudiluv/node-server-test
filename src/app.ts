require('dotenv').config();
require('./dal/index')(); //init db connection
const useRouter = require("./controllers");
import express from 'express';
import config from './config';
import cors from 'cors';
import morgan from "morgan";
import passport from "passport";
import usePassportStrategy from "./middlewares/passport";
import './globals'

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize())
app.use(morgan("dev"))
useRouter(app);
usePassportStrategy(passport)

app.listen(config.app.port, async () => {
    console.log(`server is listening on ${config.app.port}`);
    try {
        //console.log(global.sequelize.models)
        await global.sequelize.sync();
    } catch (e) {
        console.log(e)
    }
});