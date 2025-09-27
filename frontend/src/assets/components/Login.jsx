import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      alert('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* Floating Gradient Background Blur Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 rounded-full opacity-30 filter blur-3xl animate-pulse"></div>
      <div className="absolute top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full opacity-20 filter blur-2xl animate-ping"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-20 filter blur-2xl animate-pulse"></div>

      {/* Glassy Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-pink-500">Welcome Back</h1>
          <p className="text-gray-300 mt-1 text-sm">Login to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center bg-red-800/30 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-200 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-200 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition backdrop-blur-sm placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-pink-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${
              loading ? 'bg-pink-700' : 'bg-pink-900 hover:bg-pink-700'
            } text-white rounded-lg transition font-medium shadow-md`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

