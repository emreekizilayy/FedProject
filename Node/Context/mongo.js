
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://emrkzly:vbqXa3ozSUqwja6Z@cluster0.wdlo1.mongodb.net/feddb`, { useNewUrlParser: true , useUnifiedTopology: true }
);

const Schema = mongoose.Schema;

const webuserSchema = new Schema({
    name: String,
    surname: String,
    address: String,
    email: String,
    phone: String,
    lastlogindate: Date,
    adddate: { type: Date, default: Date.now },
    isdeleted: { type: Boolean, default: false },
  });

  const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    discount: String,
    brand:{type: Schema.Types.ObjectId, ref: "Brand"},
    category:{type: Schema.Types.ObjectId, ref: "Category"},
    adddate: { type: Date, default: () => Date.now() +  3*60*60*1000 },
    isdeleted: { type: Boolean, default: false },
  });

  const categorySchema = new Schema({
    name: String,
    description: String,
    adddate: { type: Date, default: () => Date.now() +  3*60*60*1000 },
    isdeleted: { type: Boolean, default: false },
  });

  const brandSchema = new Schema({
    name: String,
    description: String,
    adddate: { type: Date, default: () => Date.now() +  3*60*60*1000 },
    isdeleted: { type: Boolean, default: false },
  });

  const webuser = mongoose.model("Webuser", webuserSchema);
  const product = mongoose.model("Product", productSchema);
  const category = mongoose.model("Category", categorySchema);
  const brand = mongoose.model("Brand", brandSchema);

  module.exports = {
      webuser,product,category,brand
  }