import {Router} from "express";

const router = Router().get('/', (req,res) => {
        res.send('kek');
    }
);

module.exports = router;