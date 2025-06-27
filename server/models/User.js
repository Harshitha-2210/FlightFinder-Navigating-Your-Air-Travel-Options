import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'flightoperator'],
    default: 'user'
  },
  isApproved: {
    type: Boolean,
    default: function() {
      return this.role === 'flightoperator' ? false : true;
    }
  }
});

const User = mongoose.model('User', userSchema);

export default User;
