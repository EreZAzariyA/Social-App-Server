import express from "express";
import { getUserById } from "../05-BLL/users-logic.js";

const router = express();

// Get user by _id
router.get('/user/:user_id', async(req,res,next)=>{
  try {
    const user_id = req.params.user_id;
    const user = await getUserById(user_id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});



export default router;