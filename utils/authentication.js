const validator = require("validator")
const jwt = require("jsonwebtoken")

const ValidateLogin = (data) => {
  return new Promise((resolve, reject) => {
    const { username, password } = data
    if (validator.isEmail(username)) {
      if (password.length < 8) {
        return reject("Password must be more than 7 characters")
      }
    } else {
      if (password.length < 8) {
        return reject("Password must be more than 7 characters")
      }
    }
    return resolve("validation is succesful!")
  })
}

const ValidateRegistration = (data) => {
  return new Promise((resolve, reject) => {
    const { username, password, emailId, city, country, phoneNumber } = data
    if (!validator.isEmail(emailId)) {
      return reject("Enter a valid email address")
    }
    if (username.length < 3) {
      return reject("Username must have more then 2 charcaters")
    }
    if (password.length < 9) {
      return reject("password must be more than 8 characters")
    }
    if (!city) {
      return reject("Enter a valid city name")
    }
    if (!country) {
      return reject("Enter a valid country name")
    }
    if (phoneNumber.length != 10) {
      return reject("Please enter a valid Phone Number")
    }
    return resolve("Registration is succesful!")
  })
}

function GenerateToken(user) {
  const token = jwt.sign({ emailId: user.emailId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  })
  return token
}

module.exports = { ValidateLogin, ValidateRegistration, GenerateToken }
