import { UserModel } from "../03-Models/user-model.js";
import { getNewToken } from "../01-Utils/jwt.js";
import { checkIfUserExist, ErrorsTypes } from "../01-Utils/helpers.js";
import ClientError from "../03-Models/client-error.js";



export const register = async (user)=>{
  await checkIfUserExist(user);
  const userToSave = new UserModel({
    profile:{
      first_name: user.first_name,
      last_name: user.last_name
    },
    services:{
      password: user.password
    },
    emails:{
      email: user.email
    }
  });
  const errors =  await userToSave.validateSync()
  if(errors) throw new ClientError(500,errors.message);
  userToSave.save();
  delete userToSave.services;
  const token = getNewToken(userToSave._doc);
  return token;
};

export async function login(credentials){
  const user = await UserModel.findOne({'emails.email': credentials.email, 'services.password':credentials.password}).exec().catch((err)=>{
    if(err){
      console.log(err);
      return err;
    }
  })
  if(!user){
    throw new ClientError(500, ErrorsTypes.EMAIL_OR_PASSWORD_INCORRECT);
  }
  delete user._doc.services;
  const token = getNewToken(user._doc);
  return token;
}



export const onRegister = (user)=>{
  // console.log('user',user);
}