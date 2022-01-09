import express from "express";
import AuthService from "../../services/AuthService";

const router = express.Router();

router.post('/login', async (req,res) => {
  const data = req.body;
  try {
    const result = await AuthService.login(data.email, data.password);
    res.status(200).json(result)
  } catch (error) {
    if (error.message === 'User not Found') {
      res.status(403).json({message: error.message})
    } else {
      res.status(400).json({message: error.message})
    }
  }
});

router.post('/register', async (req,res) => {
  const data = req.body;
  try {
    const result = await AuthService.signUp(data.email, data.password);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'User already exist') {
      res.status(409).json({message: error.message})
    } else {
      res.status(400).json({message: error.message})
    }
  }
});

router.post('/refresh', async (req, res) => {
  
})

export default router;
