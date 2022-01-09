import express from "express";
import authRoute from "./auth";
import testsRoute from "./tests";
import passport from "passport";
import testsRouteWithoutAuth from "./testsWithoutAuth";

const router = express.Router();

router.use('/auth', authRoute);
router.use('/tests', testsRouteWithoutAuth);
router.use('/tests', passport.authenticate('jwt', {session: false}), testsRoute);



export default router;