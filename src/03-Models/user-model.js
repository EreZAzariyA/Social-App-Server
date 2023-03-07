import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
  profile:{
    first_name: {
      type: String,
      required: [true, "First name is missing"],
      minLength: [3, "First name is to short"],
      maxLength: [20, "First name is to long"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is missing"],
      minLength: [3, "Last name is to short"],
      maxLength: [20, "Last name is to long"],
    },
  },
  services:{
    password: {
      type: String,
      required: [true, "Password is missing"],
      minLength: [3, "Password is to short"],
      maxLength: [20, "Password is to long"],
    }
  },
  emails:{
    email: {
      type: String,
      required: [true, "Email is missing"],
      unique: true
    }
  }
},
{ versionKey: false }
);

export const UserModel = mongoose.model('user', UserSchema, 'users');
