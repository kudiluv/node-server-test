import express from "express";
import { where } from "sequelize/types";
import { UserInctance } from "../../models/user";

const router = express.Router();
const models = global.sequelize.models;

router.get('/', async (req, res) => {
  
  const result = await models.Test.findAll(
    {
      attributes: ["id", "name"],
      where: {
        userId: req.user.id
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      limit: 10,
      offset: Number(req.query.offset) || 0,
    }
  );
  res.json(result);
});

router.post('/', async (req, res) => {

  const data = req.body;

  if (!data.name) {
    res.status(400).json({message: "Incrorrect name"});
    return;
  }
  const test = await models.Test.create({
    userId: req.user.id,
    name: data.name
  });
  res.status(201).json(test);
})

router.delete('/:id', async (req, res) => {

  const result = await models.Test.findByPk(req.params.id);
  if (!result) {
    res.sendStatus(404);
    return;
  }
  if (result.userId === req.user.id) {
    models.Test.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } else { 
    res.sendStatus(403);
  }
})

export default router;
