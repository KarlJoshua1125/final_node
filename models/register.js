const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    required: true
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
