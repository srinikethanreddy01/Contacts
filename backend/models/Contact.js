const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneNoRegex = /^[0-9]{10}$/;

const schema = new mongoose.Schema({
  'FirstName':{
    required:[true, 'First name is required'],
    type:String,
    minlength: [2,'First name should be at least 2 characters long'],
  },
  'LastName':{
    required: [true,'Last name is required'],
    type: String,
    minlength: [2,'Last name should be at least 2 characters long'],
  },
  'Email':{
    required:[true,'Email is required'],
    type:String,
    unique:true,
    match:[emailRegex,'Please provide a valid email address'],
  },
  'PhoneNo':{
    required:[true,'Phone number is required'],
    type:String,
    match:[phoneNoRegex,'Phone number must be 10 digits long'],
  },
  'Company':{
    required:[true,'Company name is required'],
    type:String,
    minlength:[3,'Company Name should be at least 3 characters long'],
  },
  'JobTitle':{
    required:[true,'Job title is required'],
    type: String,
  },
});


const Contacts = mongoose.model('contacts', schema);
module.exports = Contacts;
