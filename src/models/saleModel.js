const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' } // Estado de la venta
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
