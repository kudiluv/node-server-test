import {utils} from "../utils";
import {Express} from "express";
import apiRoute from "./api";

const useRouter = (app:Express) => {
    app.use("/api", apiRoute);
}

module.exports = useRouter;