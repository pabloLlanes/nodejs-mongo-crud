const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: String,
    description:String,
    brand: String,
    

});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;