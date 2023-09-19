const express = require("express")
const router = express.Router()
const Posts = require("../models/PostModel")
// const upload = multer({ dest: "uploads/" })

router.post("/upload", (req, res) => {
  console.log(req.body)
  res.send({
    status: 200,
    message: "post api works perfectly",
  })
})

module.exports = router
