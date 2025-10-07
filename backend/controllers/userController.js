const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt')
// @desc    Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @desc    Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//login user
// exports.loginuser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !password) return res.status(404).json({ message: 'login fail' });
//     const ispassEqual = await bcrypt.compare(password, user.password);
//     if (!ispassEqual) {

//       return res.status(404).json({ message: 'login fail password not match' })
//     } else {
//       const jwtToken = jwt.sign(
//         {email:user.email , id:user.id},
//         process.env.JWT_SECRET,
//         {expiresIn:'24h'}
      
//       )
//       res.status(200)
//       .json({
//         message:"login success",
//         jwtToken,
//         email,
//         name:user.name,
//         user
//       });

//       console.log(user)
//     }



//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
/////////////
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Compare passwords
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ✅ Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // ✅ Send token and user info
    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: userResponse,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    // Validate required fields
    if (!userData.password || !userData.email) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Replace plain password with hashed one
    userData.password = hashedPassword;

    // Create and save user
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    // Remove password before sending response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'Signup successful', user: userResponse });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// @desc    Update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
