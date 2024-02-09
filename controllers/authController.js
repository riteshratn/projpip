const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Project = require('../models/project');

// @route POST /api/register
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are mandatory.' });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    const defaultProject = new Project({ name: 'Default Project' });
    await defaultProject.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      projects: [defaultProject._id],
    });
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

  
  // @route POST /api/login
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    }
    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              email: user.email,
              id: user._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' } 
        );
        return res.status(200).json({ accessToken });
      } else {
        return res.status(401).json({ message: 'Email or Password is invalid.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Login failed' });
    }
  });

//@route POST/api/current
const currentUser = asyncHandler(async (req,res) => {
  console.log('Request received in currentUser controller');
  res.json(req.user);
});

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { newData } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
  
module.exports = { registerUser, loginUser, currentUser, updateUser };
