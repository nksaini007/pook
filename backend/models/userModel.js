// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: Number,
//   age: Number
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'principal', 'admin'],
    required: true
  },

  // Student
  grade: String,
  enrollmentYear: String,
  major: String,

  // Teacher
  subjects: String,
  experience: String,

  // Principal
  yearsAsPrincipal: String,
  schoolName: String,

  // Admin
  department: String,
  adminLevel: String,
});

module.exports = mongoose.model('User', userSchema);
