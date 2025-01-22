const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//define schema for the user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//method to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to compare passwords for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;
