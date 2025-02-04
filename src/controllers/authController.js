const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken(user._id);
    res.json({ userName: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };