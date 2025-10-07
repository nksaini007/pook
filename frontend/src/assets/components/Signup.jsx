import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const [studentDetails, setStudentDetails] = useState({
    grade: '',
    enrollmentYear: '',
    major: '',
  });

  const [teacherDetails, setTeacherDetails] = useState({
    subjects: '',
    experience: '',
  });

  const [principalDetails, setPrincipalDetails] = useState({
    yearsAsPrincipal: '',
    schoolName: '',
  });

  const [adminDetails, setAdminDetails] = useState({
    department: '',
    adminLevel: '',
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const baseData = { name, email, password, role };
    let roleDetails = {};

    switch (role) {
      case 'student':
        roleDetails = studentDetails;
        break;
      case 'teacher':
        roleDetails = teacherDetails;
        break;
      case 'principal':
        roleDetails = principalDetails;
        break;
      case 'admin':
        roleDetails = adminDetails;
        break;
      default:
        break;
    }

    const formData = { ...baseData, ...roleDetails };

    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      alert(response.data.message || 'Signup successful!');
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed. Please try again.';
      alert(msg);
    }
  };

  const inputClasses =
    'w-full px-4 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-gray-400';

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-50 overflow-hidden px-4 py-12">

      {/* Soft Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full opacity-40 filter blur-3xl"></div>
      <div className="absolute top-20 -right-20 w-80 h-80 bg-blue-200 rounded-full opacity-40 filter blur-2xl"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Join as Student, Teacher, Principal or Admin</p>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selector */}
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className={inputClasses}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
              <option value="admin">Admin</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none">
              ▼
            </div>
          </div>

          {/* Dynamic Role Fields */}
          {role === 'student' && (
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Grade"
                className={inputClasses}
                value={studentDetails.grade}
                onChange={(e) =>
                  setStudentDetails({ ...studentDetails, grade: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Enrollment Year"
                className={inputClasses}
                value={studentDetails.enrollmentYear}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    enrollmentYear: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Major"
                className={inputClasses}
                value={studentDetails.major}
                onChange={(e) =>
                  setStudentDetails({ ...studentDetails, major: e.target.value })
                }
                required
              />
            </div>
          )}

          {role === 'teacher' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Subjects"
                className={inputClasses}
                value={teacherDetails.subjects}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, subjects: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Experience (years)"
                className={inputClasses}
                value={teacherDetails.experience}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, experience: e.target.value })
                }
                required
              />
            </div>
          )}

          {role === 'principal' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Years as Principal"
                className={inputClasses}
                value={principalDetails.yearsAsPrincipal}
                onChange={(e) =>
                  setPrincipalDetails({
                    ...principalDetails,
                    yearsAsPrincipal: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="School Name"
                className={inputClasses}
                value={principalDetails.schoolName}
                onChange={(e) =>
                  setPrincipalDetails({
                    ...principalDetails,
                    schoolName: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          {role === 'admin' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Department"
                className={inputClasses}
                value={adminDetails.department}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, department: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Admin Level"
                className={inputClasses}
                value={adminDetails.adminLevel}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, adminLevel: e.target.value })
                }
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
