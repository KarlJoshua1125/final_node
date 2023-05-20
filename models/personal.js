const mongoose = require('mongoose');

const registerpersonalSchema = new mongoose.Schema({
  fname: String,
  mname: String,
  lname: String,
  gender: String,
  address: String,
  region: String,
  city: String,
  civilstatus: String,
  zipcode: Number,
  hobby: String
});

const Personal = mongoose.model('Personal', registerpersonalSchema);

module.exports = Personal;
