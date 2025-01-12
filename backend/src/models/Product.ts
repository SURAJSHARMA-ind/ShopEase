import mongoose from "mongoose";
import { IProduct } from '../database/dbTypes';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Products = new Schema<IProduct>({
  product_id: { type: ObjectId, ref: 'admin' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [{
    url: { type: String, required: true }
  }]
}, { 
  timestamps: true 
});

export const ProductsModel = mongoose.model("products", Products); 