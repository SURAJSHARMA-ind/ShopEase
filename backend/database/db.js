const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const Users = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_no: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: [{
    street: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true }
  }
  ]
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

const Admin = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_no: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, {
  timestamps: true
}
);

const Products = new Schema({
  product_id: { type: ObjectId, ref: 'admin' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [
    {
      id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  stock: { type: Number, required: true }
}
  , { timestamps: true }
);

const Cart = new Schema({
  cart_id: { type: ObjectId, ref: 'users' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [
    {
      id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  quantity: { type: Number, required: true }
});

const Order = new Schema({
  order_id: { type: ObjectId, ref: 'users' },
  price: { type: Number, require: true },
  itmes: [{
    product_id: { type: String, require: true },
    name: { type: String, require: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total_amount: { type: Number, required: true }
  }
  ],

}, { timestamps: true }
)

const UsersModel = mongoose.model("users", Users);
const AdminModel = mongoose.model("admin", Admin);
const ProductsModel = mongoose.model("products", Products);
const CartModel = mongoose.model("cart", Cart);
const OrderModel = mongoose.model("order", Order);

module.exports = { UsersModel, ProductsModel, AdminModel, CartModel, OrderModel };
