const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PostSchema = new Schema({
  personId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
  },
})

module.exports = mongoose.model("Post", PostSchema)
