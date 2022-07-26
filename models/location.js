const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const productSchema = new mongoose.Schema({
    unit_number: {type: Number , required:true},
    street_name: {type: String , required:true},
    city: { type: String, require: true},
    province: {type: String, required:false},
    zip_code:  {type: String, required:true},
    country: {type: String, required:true},  
},{ timestamps: true });

const product = mongoose.model("location", productSchema);
module.exports = product;