const express = require("express")
const router = express.Router()
const Users = require("../models/UserModel")
const validator = require("validator")
const bcrypt = require("bcrypt")
const saltRounds = 10
const fs = require("fs")

const {
  ValidateLogin,
  ValidateRegistration,
  GenerateToken,
} = require("../utils/authentication")
// Login Page route
router.post("/login", async function (req, res) {
  const { username, password } = req.body
  console.log("user", username, password)
  if (!username || !password) {
    return res.send({
      status: 400,
      message: "username and password are required",
    })
  }
  try {
    await ValidateLogin(req.body)
  } catch (error) {
    return res.send({
      status: 402,
      message: error,
    })
  }
  let userDetails = {}
  if (validator.isEmail(username)) {
    userDetails = await Users.findOne({ emailId: username })
    if (!userDetails) {
      return res.send({
        status: 400,
        message: "user not found",
        data: {
          username,
          password,
        },
      })
    }
    const isMatched = await bcrypt.compare(password, userDetails.password)
    if (!isMatched) {
      return res.send({
        status: 400,
        message: "password entered wrong. kindly try again",
        data: {
          username,
          password,
        },
      })
    }
  } else {
    userDetails = await Users.findOne({ username: username })
    if (!userDetails) {
      return res.send({
        status: 400,
        message: "user not found",
        data: {
          username,
          password,
        },
      })
    }
    const isMatched = await bcrypt.compare(password, userDetails.password)
    if (!isMatched) {
      return res.send({
        status: 400,
        message: "password entered wrong. kindly try again",
        data: {
          username,
          password,
        },
      })
    }
  }
  if (userDetails) {
    let token = GenerateToken(userDetails)
    return res.send({
      status: 200,
      message: "Login is succesfull!",
      data: {
        username: username,
        password: password,
        token: token,
      },
    })
  } else {
    return res.send({
      status: 400,
      message: "user not found",
      data: {
        username,
        password,
      },
    })
  }
})

router.post("/signup", async (req, res) => {
  const { username, password, emailId, city, country, phoneNumber } = req.body

  let profile = req.file ? req.file : null
  let imagename = profile ? profile.originalname : null
  console.log("reqbody", req.body)
  if (!username || !password || !emailId || !city || !country || !phoneNumber) {
    return res.send({
      status: 400,
      message: "username and password are required",
    })
  }
  try {
    await ValidateRegistration(req.body)
  } catch (error) {
    return res.send({
      status: 402,
      message: error,
      data: {
        username: username,
        emailId: emailId,
        phoneNumber: phoneNumber,
      },
    })
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  let user = {}
  if (imagename) {
    user = new Users({
      username: username,
      password: hashedPassword,
      emailId: emailId,
      city: city,
      country: country,
      phoneNumber: phoneNumber,
      avatar: `${__dirname}/../uploads/${imagename}`,
      createdDate: Date.now(),
    })
  } else {
    user = new Users({
      username: username,
      password: hashedPassword,
      emailId: emailId,
      city: city,
      country: country,
      phoneNumber: phoneNumber,
      createdDate: Date.now(),
    })
  }

  const userData = await user.save()
  fs.unlink(`${__dirname}/../uploads/${imagename}`, (error) => {
    if (error) {
      throw error
    }
  })
  res.send({
    status: 200,
    message:
      "Registration is succesfull, Kindly login using your email/username",
    data: userData,
  })
})

router.post("/getUser", async (req, res) => {
  const { emailId } = req.body
  console.log(emailId)
  if (!emailId) {
    return res.send({
      status: 400,
      message: "No data received",
    })
  }

  const userFound = await Users.findOne({ emailId: emailId })
  console.log(userFound)
  return res.send({
    status: 200,
    message: "retrival successful",
  })
})

module.exports = router
