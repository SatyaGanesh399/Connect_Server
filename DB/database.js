const mongoose = require("mongoose")

const ConnectToDb = async () => {
  await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to Database")
    })
    .catch((error) => {
      console.log("error connecting database", error)
    })
}

module.exports = ConnectToDb
