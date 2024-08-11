const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sub: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  webhookUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);