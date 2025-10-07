const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginuser
} = require('../controllers/userController');

const protect = require('../middlewares/authMiddleware'); // ✅ import JWT middleware

// ========================
// 🔓 Public Routes
// ========================

// Register (Signup)
router.post('/', createUser);

// Login
router.post('/login', loginuser);

// ========================
// 🔐 Protected Routes
// ========================

// Get all users
router.get('/', protect, getUsers);

// Get single user by ID
router.get('/:id', protect, getUserById);

// Update user
router.put('/:id', protect, updateUser);

// Delete user
router.delete('/:id', protect, deleteUser);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
//   loginuser
// } = require('../controllers/userController');
// router.post('/login',loginuser);
// // GET all users
// router.get('/', getUsers);

// // GET single user
// router.get('/:id', getUserById);

// // POST create new user
// // router.post('/', createUser);
// router.post('/',createUser)
// // PUT update user
// router.put('/:id', updateUser);

// // DELETE user
// router.delete('/:id', deleteUser);



// //login

// module.exports = router;
