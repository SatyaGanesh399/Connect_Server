const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
})

module.exports = mongoose.model("User", UserSchema)
