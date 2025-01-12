import mongoose from "mongoose";
import { IOrder } from '../database/dbTypes';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Order = new Schema<IOrder>({
  order_id: { type: ObjectId, ref: 'users' },
  price: { type: Number, require: true },
  items: [{
    product_id: { type: String, require: true },
    name: { type: String, require: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total_amount: { type: Number, required: true }
  }]
}, { 
  timestamps: true 
});

export const OrderModel = mongoose.model("order", Order); 