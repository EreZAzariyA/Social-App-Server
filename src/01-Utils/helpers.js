import ClientError from "../03-Models/client-error.js";
import { UserModel } from "../03-Models/user-model.js";

export const ErrorsTypes = {
  APP_JSON_MISSING: "Server requires application/json. We don't share our API.",
  EMAIL_EXIST: "Email already exist",
  EMAIL_NOT_VALID: "This is not a valid email address",
  EMAIL_OR_PASSWORD_INCORRECT: "Email or password are incorrect",
}

export const checkIfUserExist = async (user)=>{
  const users = await UserModel.find({'emails.email': user.email}).exec().catch((err)=>{
    return err
  });
  if(users.length >0){
    throw new ClientError(500, ErrorsTypes.EMAIL_EXIST);
  }
  return users[0];
}
