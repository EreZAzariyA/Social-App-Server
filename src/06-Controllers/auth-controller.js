import express from "express";
import { register, login } from "../05-BLL/auth-logic.js";

const router = express.Router();

router.post('/register',async (req,res,next)=>{
  try {
    const user = req.body;
    const token = await register(user);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  };
});

router.post('/login',async (req,res,next)=>{
  try {
    const credentials = req.body;
    const token = await login(credentials);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  };
});


export default router;