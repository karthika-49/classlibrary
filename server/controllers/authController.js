const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({path:".env"})
const JWT_SECRET =  process.env.JWT_SECRET;

function generateUserId() {
  return Date.now().toString();
}

async function signup(req, res) {
    console.log(req.body);
    try {
      const existingEmail = await UserModel.findOne({
        email: req.body.email,
      });
  
      if (existingEmail) {
        return res.status(409).json({ msg: "Email already exists!" });
      }
  
      const newUser = new UserModel({
        email: req.body.email,
        password: req.body.password,
        userId: generateUserId(), 
      });
  
      await newUser.save();
  
      console.log("User created!");
      console.log(newUser.toJSON());
      return res.status(201).json({
        msg: "Success",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }


async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(403).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.userId }, JWT_SECRET);

    console.log('User logged in!');
    console.log(email);
    res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  signup,
  login,
};
