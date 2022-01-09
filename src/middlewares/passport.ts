import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import config from "../config";
import { UserInctance } from "../models/user";
const models = global.sequelize.models;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.salt
}

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await models.User.findByPk(payload.data.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
      } catch (error) {
        console.log(error);
      }
    })
  );
}
