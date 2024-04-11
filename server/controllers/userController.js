const UserModel = require('../models/User');

const profile = async (req, res) => {
    console.log("hi")
    console.log(req);
    try {
      const user = await UserModel.findOne({ userId: req.userId });
      res.status(200).json({
        message: 'About',
        user,
      });
    //   res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  const updateProfile = async (req, res) => {
    try {
      const { name } = req.body; // Assuming the name is sent in the request body
  
      const user = await UserModel.findOne({ userId: req.userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name;
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  module.exports={
    profile,
    updateProfile,
  }