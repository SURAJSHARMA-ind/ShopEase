const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneno: { type: Number, required: true, unique: true },
  password: {type:String, required:true},
});

const Items = new Schema({
  title:  {type:String, required:true},
  description:  {type:String, required:true},
  status: Boolean,
});

const UserModel = mongoose.model("user", User);
const ItemsModel = mongoose.model("Items", Items);

module.exports = { UserModel, ItemsModel };
