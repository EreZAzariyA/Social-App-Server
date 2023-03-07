import { UserModel } from "../03-Models/user-model.js"

export const getUserById = async (user_id)=>{
  const user = await UserModel.findById(user_id).exec();
  delete user.services.password;
  return user;
}

