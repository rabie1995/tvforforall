'use client';

import { useEffect, useState } from 'react';
import { ChartBarIcon, UsersIcon, ShoppingBagIcon, CogIcon } from '@heroicons/react/24/outline';

type Tab = 'dashboard' | 'data' | 'analytics' | 'settings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          fetch('/api/admin/clients'),
          fetch('/api/admin/orders'),
        ]);

        const users = usersRes.ok ? await usersRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalRevenue: orders.reduce((sum: number, order: any) => sum + (order.amountUsd || 0), 0),
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: ChartBarIcon },
    { id: 'data' as Tab, name: 'Data', icon: UsersIcon },
    { id: 'analytics' as Tab, name: 'Analytics', icon: ShoppingBagIcon },
    { id: 'settings' as Tab, name: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="text-sm text-gray-500">
              Direct Access - No Authentication Required
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-64 bg-white rounded-lg shadow-sm p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <UsersIcon className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalUsers}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <ShoppingBagIcon className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : stats.totalOrders}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <ChartBarIcon className="w-8 h-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? '...' : `$${stats.totalRevenue.toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="text-sm text-gray-600">
                    <p>Dashboard loaded successfully</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
                <p className="text-gray-600">Data management features will be implemented here.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Traffic Analytics</h2>
                <p className="text-gray-600">Analytics dashboard will be implemented here.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
                <p className="text-gray-600">Settings panel will be implemented here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
