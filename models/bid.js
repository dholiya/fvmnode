const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const productSchema = new mongoose.Schema({
    product_id : {type: String , required:true},
    user_id: {type: String , required:true},
    bid_date: {type: String , required:true},
    bid_amount: {type: Number, required:true},
},{ timestamps: true });

const product = mongoose.model("bid", productSchema);
module.exports = product;
