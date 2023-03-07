import express from "express";
import homeLogic from "../05-BLL/home-logic.js";

const router = express();


// Get user by search input
router.post('/search-user', async(req,res,next)=>{
  try {
    const searchValue = req.body.searchValue;
    const usersBaseOnSearchValue = await homeLogic.getUserBySearchInput(searchValue);

    res.json(usersBaseOnSearchValue);
  } catch (err) {
    next(err);
  }
});

export default router;