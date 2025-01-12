import mongoose from "mongoose";
import { IAdmin } from '../database/dbTypes';
const Schema = mongoose.Schema;

const Admin = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_no: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
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

export const AdminModel = mongoose.model("admin", Admin); 