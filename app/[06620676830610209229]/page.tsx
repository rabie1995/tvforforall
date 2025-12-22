'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChartBarIcon, UsersIcon, ShoppingBagIcon, CogIcon } from '@heroicons/react/24/outline';

type Tab = 'dashboard' | 'data' | 'analytics' | 'settings';

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('admin_logged') === 'true';
    if (!isLoggedIn) {
      router.push('/06620676830610209229/login');
      return;
    }

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
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged');
    router.push('/06620676830610209229/login');
  };

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: ChartBarIcon },
    { id: 'data' as Tab, name: 'Data', icon: UsersIcon },
    { id: 'analytics' as Tab, name: 'Analytics', icon: ShoppingBagIcon },
    { id: 'settings' as Tab, name: 'Settings', icon: CogIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
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
                          {stats.totalUsers}
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
                          {stats.totalOrders}
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
                          ${stats.totalRevenue.toFixed(2)}
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
