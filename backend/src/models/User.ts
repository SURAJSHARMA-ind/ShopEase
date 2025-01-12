import mongoose from "mongoose";
import { IUser } from '../database/dbTypes';
const Schema = mongoose.Schema;

const Users = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_no: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: [{
    street: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true }
  }]
}, {
  timestamps: true
});

export const UsersModel = mongoose.model("users", Users);