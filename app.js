const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
var cors = require("cors")
const ConnectToDb = require("./DB/database")
const multer = require("multer")
const passport = require("passport")
const cookieSession = require("cookie-session")
const passportStrategy = require("./passport")
const Auth = require("./controllers/AuthController")
const Post = require("./controllers/PostController")

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(
  bodyParser.json({
    type: ["application/x-www-form-urlencoded", "application/json"],
  })
)

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

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
