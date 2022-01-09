import express from "express";

const router = express.Router();
const models = global.sequelize.models;

router.get('/:id', async (req, res) => {
  const test = await models.Test.findByPk(req.params.id);
  
  if (test) {
    res.json(test);
  } else {
    res.sendStatus(404);
  }
})

export default router;
