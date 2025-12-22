'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin-auth/verify', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setIsAuthenticated(true);
        } else {
          router.push('/06620676830610209229/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/06620676830610209229/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-slate-400">Admin configuration</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Security Settings */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

          <div className="space-y-6">
            {/* Session Information */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="font-semibold text-white mb-4">Current Session</h3>
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Username:</span>
                  <span className="font-mono text-slate-200">{username}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Authentication:</span>
                  <span className="text-green-400 font-semibold">Verified</span>
                </div>
              </div>
            </div>

            {/* Login Attempts */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="font-semibold text-white mb-4">Login Security</h3>
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">
                  ✓ Rate limiting enabled (5 attempts, 15-minute lockout)
                </p>
                <p className="text-slate-300 text-sm">
                  ✓ Failed attempts logged
                </p>
                <p className="text-slate-300 text-sm">
                  ✓ Secure session cookies (HTTP-only, SameSite: Strict)
                </p>
                <p className="text-slate-300 text-sm">
                  ✓ Password hashed with bcrypt (cost: 10)
                </p>
              </div>
            </div>

            {/* Token Information */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="font-semibold text-white mb-4">Token Details</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Token Type:</p>
                  <p className="font-mono text-sm">JWT (HS256)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Expiration:</p>
                  <p className="font-mono text-sm">24 hours</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Storage:</p>
                  <p className="font-mono text-sm">HTTP-only Cookie</p>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-200 mb-4">Recommendations</h3>
              <ul className="space-y-2 text-yellow-100 text-sm">
                <li>✓ Change admin password regularly</li>
                <li>✓ Use strong, unique passwords</li>
                <li>✓ Do not share login credentials</li>
                <li>✓ Logout when finished</li>
                <li>✓ Keep admin route URL private</li>
                <li>✓ Monitor login attempts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">System Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Admin Route</p>
              <p className="text-white font-mono text-sm">/06620676830610209229</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Authentication API</p>
              <p className="text-white font-mono text-sm">/api/admin-auth/*</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Session Cookie</p>
              <p className="text-white font-mono text-sm">admin_token</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Security Level</p>
              <p className="text-green-400 font-semibold">Enterprise Grade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
