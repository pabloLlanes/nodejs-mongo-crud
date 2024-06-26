const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: 'USER' },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;