'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Set localStorage flag
        localStorage.setItem('admin_logged', 'true');
        // Redirect to admin panel
        router.push('/06620676830610209229');
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Minimal, professional login form */}
      <div className="w-full max-w-md">
        {/* No branding - minimal design */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 shadow-2xl">
          {/* Title - neutral language */}
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Access Required</h1>
          <p className="text-slate-400 text-center text-sm mb-8">
            Enter your credentials to continue
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={loading}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              {loading ? 'Checking credentials...' : 'Continue'}
            </button>
          </form>

          {/* Minimal footer - no helpful hints */}
          <p className="text-slate-500 text-xs text-center mt-8">
            Unauthorized access is prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
