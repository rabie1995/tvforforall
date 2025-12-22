'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is authenticated by looking for token in cookies
    const checkAuth = async () => {
      try {
        // Try to access a protected resource to verify authentication
        const response = await fetch('/api/admin-auth/verify', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setIsAuthenticated(true);
        } else {
          // Not authenticated, redirect to login
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/06620676830610209229/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-slate-400">
              Logged in as: <span className="text-slate-300 font-medium">{username}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to Admin Panel</h2>
          <p className="text-slate-300 mb-6">
            You have successfully authenticated. This is your secure admin dashboard.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin"
              className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg border border-slate-600 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">Orders Dashboard</h3>
              <p className="text-slate-400 text-sm">View and manage orders</p>
            </a>

            <a
              href="/admin/clients"
              className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg border border-slate-600 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">Client Data</h3>
              <p className="text-slate-400 text-sm">Manage client information</p>
            </a>

            <a
              href="/06620676830610209229/settings"
              className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg border border-slate-600 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">Settings</h3>
              <p className="text-slate-400 text-sm">Admin configuration</p>
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <h3 className="text-xl font-bold text-white mb-6">System Status</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Authentication</p>
              <p className="text-2xl font-bold text-green-400">✓ Active</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Session</p>
              <p className="text-2xl font-bold text-green-400">✓ Secure</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Database</p>
              <p className="text-2xl font-bold text-green-400">✓ Connected</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Route Protection</p>
              <p className="text-2xl font-bold text-green-400">✓ Enabled</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Security Notice:</span> This is a secure admin panel. Do not share your login credentials. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
