import fs from 'fs';
import path from "path";
import { Response } from 'express';

export const utils = {
    readdirRecursiveSync(directory:string) :string[] {
        const result = [];
        readdir(directory);
        return result;

        function readdir(current) {
            const files = fs.readdirSync(current);

            files.forEach(function (file) {
                const absViam = path.resolve(current, file);
                const stat = fs.statSync(absViam);

                if (stat.isFile()) result.push(absViam);
                if (stat.isDirectory()) readdir(absViam);
            });
        }
    },
}

export const errorHanler = (res: Response, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error   
    })
}