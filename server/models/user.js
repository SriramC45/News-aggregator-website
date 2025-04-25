const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Store password as plain text (for testing purposes)
  active: { type: Number, default: 0 }  // New 'active' field, default to 0 (inactive)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
