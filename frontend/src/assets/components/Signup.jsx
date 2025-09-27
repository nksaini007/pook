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
    'w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring--500 backdrop-blur-md placeholder-gray-300';

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 py-12">

      {/* Floating Gradient Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 rounded-full opacity-30 filter blur-3xl animate-pulse"></div>
      <div className="absolute top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full opacity-20 filter blur-2xl animate-ping"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-20 filter blur-2xl animate-pulse"></div>

      {/* Signup Form Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20 text-white">
        <h2 className="text-3xl text-pink-500 font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name, Email */}
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
    <option value="student" className="bg-gray-600"> Student</option>
    <option value="teacher" className="bg-gray-600"> Teacher</option>
    <option value="principal" className="bg-gray-600 "> Principal</option>
    <option value="admin" className="bg-gray-600 "> Admin</option>
  </select>

  {/* Optional down-arrow icon (custom styling) */}
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-pink-400">
    ▼
  </div>
</div>


          {/* Dynamic Fields */}
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
                  setStudentDetails({ ...studentDetails, enrollmentYear: e.target.value })
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');

//   const [studentDetails, setStudentDetails] = useState({
//     grade: '',
//     enrollmentYear: '',
//     major: '',
//   });

//   const [teacherDetails, setTeacherDetails] = useState({
//     subjects: '',
//     experience: '',
//   });

//   const [principalDetails, setPrincipalDetails] = useState({
//     yearsAsPrincipal: '',
//     schoolName: '',
//   });

//   const [adminDetails, setAdminDetails] = useState({
//     department: '',
//     adminLevel: '',
//   });

//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const baseData = { name, email, password, role };
//     let roleDetails = {};

//     switch (role) {
//       case 'student':
//         roleDetails = studentDetails;
//         break;
//       case 'teacher':
//         roleDetails = teacherDetails;
//         break;
//       case 'principal':
//         roleDetails = principalDetails;
//         break;
//       case 'admin':
//         roleDetails = adminDetails;
//         break;
//       default:
//         break;
//     }

//     const formData = { ...baseData, ...roleDetails };

//     try {
//       const response = await axios.post('http://localhost:5000/api/users', formData);
//       alert(response.data.message || 'Signup successful!');
//       navigate('/login');
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Signup failed. Please try again.';
//       alert(msg);
//     }
//   };

//   const inputClasses =
//     'w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500';

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
//       <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl text-pink-500 font-bold text-center mb-6">Create Account</h2>

//         <form onSubmit={handleSignup} className="space-y-6">
//           {/* Name, Email, Password */}
//           <div className="grid sm:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className={inputClasses}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className={inputClasses}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               className={inputClasses}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Role Selection */}
//           <div>
//             <select
//               className={inputClasses}
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//               <option value="principal">Principal</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {/* Dynamic Role-Specific Fields */}
//           {role === 'student' && (
//             <div className="grid sm:grid-cols-3 gap-4">
//               <input
//                 type="text"
//                 placeholder="Grade"
//                 className={inputClasses}
//                 value={studentDetails.grade}
//                 onChange={(e) =>
//                   setStudentDetails({ ...studentDetails, grade: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Enrollment Year"
//                 className={inputClasses}
//                 value={studentDetails.enrollmentYear}
//                 onChange={(e) =>
//                   setStudentDetails({ ...studentDetails, enrollmentYear: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Major"
//                 className={inputClasses}
//                 value={studentDetails.major}
//                 onChange={(e) =>
//                   setStudentDetails({ ...studentDetails, major: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           )}

//           {role === 'teacher' && (
//             <div className="grid sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Subjects"
//                 className={inputClasses}
//                 value={teacherDetails.subjects}
//                 onChange={(e) =>
//                   setTeacherDetails({ ...teacherDetails, subjects: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Experience (years)"
//                 className={inputClasses}
//                 value={teacherDetails.experience}
//                 onChange={(e) =>
//                   setTeacherDetails({ ...teacherDetails, experience: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           )}

//           {role === 'principal' && (
//             <div className="grid sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Years as Principal"
//                 className={inputClasses}
//                 value={principalDetails.yearsAsPrincipal}
//                 onChange={(e) =>
//                   setPrincipalDetails({
//                     ...principalDetails,
//                     yearsAsPrincipal: e.target.value,
//                   })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="School Name"
//                 className={inputClasses}
//                 value={principalDetails.schoolName}
//                 onChange={(e) =>
//                   setPrincipalDetails({
//                     ...principalDetails,
//                     schoolName: e.target.value,
//                   })
//                 }
//                 required
//               />
//             </div>
//           )}

//           {role === 'admin' && (
//             <div className="grid sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Department"
//                 className={inputClasses}
//                 value={adminDetails.department}
//                 onChange={(e) =>
//                   setAdminDetails({ ...adminDetails, department: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Admin Level"
//                 className={inputClasses}
//                 value={adminDetails.adminLevel}
//                 onChange={(e) =>
//                   setAdminDetails({ ...adminDetails, adminLevel: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-gray-400 mt-6">
//           Already have an account?{' '}
//           <Link to="/login" className="text-pink-400 hover:underline">
//             Log in
//           </Link>
//         </p>
//   3    </div>
//     </div>
//   );
// }

// export default Signup;
