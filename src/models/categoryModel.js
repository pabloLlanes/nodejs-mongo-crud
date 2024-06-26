const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;
