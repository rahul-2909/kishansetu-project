const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
  description: { type: String, default: '' },
  
  
  village: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: 'Gujarat' } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);