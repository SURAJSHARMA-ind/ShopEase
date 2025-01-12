import mongoose from "mongoose";
import { ICart } from '../database/dbTypes';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Cart = new Schema<ICart>({
  cart_id: { type: ObjectId, ref: 'users' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: [{
    id: { type: String, required: true },
    url: { type: String, required: true }
  }]
});

export const CartModel = mongoose.model("cart", Cart); 