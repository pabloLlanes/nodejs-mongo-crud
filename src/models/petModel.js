const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
