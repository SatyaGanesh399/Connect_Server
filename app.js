const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")
const ConnectToDb = require("./DB/database")
const multer = require("multer")
const Users = require("./models/UserModel")

require("dotenv").config()
const Auth = require("./controllers/AuthController")
const Post = require("./controllers/PostController")

const {
  ValidateLogin,
  ValidateRegistration,
} = require("./utils/authentication")

const bcrypt = require("bcrypt")
const saltRounds = 10

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(
  bodyParser.json({
    type: ["application/x-www-form-urlencoded", "application/json"],
  })
)

// cors
app.use(cors())

let Storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: Storage,
  limits: { fileSize: "10MB" },
})

app.use(express.static("files"))

// port number
const PORT_NUMBER = process.env.PORT

// server listerning
app.listen(PORT_NUMBER, () => {
  console.log(`app is listerning to port ${PORT_NUMBER}`)
})
ConnectToDb()
// base api
app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: "Your app is working",
  })
})

// Authentication api's
app.use("/auth", upload.single("avatar"), Auth)

// Post api's
app.use("/post", Post)
