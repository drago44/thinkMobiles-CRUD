import { Schema, model } from "mongoose";
import { setPassword, validPassword } from "../utils/usePassword.mjs";

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  hash: String,
  salt: String,
});

// Method to set salt and hash the password for a user
usersSchema.methods.setPassword = function (password) {
  setPassword(this, password);
};

// Method to check the entered password is correct or not
usersSchema.methods.validPassword = function (password) {
  return validPassword(this, password);
};

export default model("User", usersSchema);
