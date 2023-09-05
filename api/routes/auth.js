const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, "lama").toString(),
  });
  try {
    const user = await newUser.save();
    console.log(user);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      console.log("find");
      console.log(user);
      const bytes = CryptoJS.AES.decrypt(user.password, "lama");
      const original = bytes.toString(CryptoJS.enc.Utf8);
      if (original == req.body.password) {
        const { password, ...info } = user._doc;
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          "lama",
          { expiresIn: "5d" }
        );
        res.json({ info, accessToken });
      } else {
        return res.json("wrong password or email");
      }
    } else {
      return res.json("wrong password or email");
    }
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
