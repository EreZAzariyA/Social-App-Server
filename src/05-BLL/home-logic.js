import { UserModel } from "../03-Models/user-model.js"


const getUserBySearchInput = async (searchValue)=>{
  const users = await UserModel.find({
    $or: [
      { 'profile.first_name': { $regex: searchValue } },
      { 'profile.last_name': { $regex: searchValue } },
    ]
  }).select('-services').exec();
  return users;
}

export default {
  getUserBySearchInput
}