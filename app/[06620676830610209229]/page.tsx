'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  TableCellsIcon,
  ChartPieIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

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
  const [clientData, setClientData] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('admin_logged') === 'true';
    if (!isLoggedIn) {
      router.push('/06620676830610209229/login');
      return;
    }

    // Fetch dashboard stats and data
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          fetch('/api/admin/clients'),
          fetch('/api/admin/orders'),
        ]);

        const users = usersRes.ok ? await usersRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];

        setClientData(users);
        setOrderData(orders);

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalRevenue: orders.reduce((sum: number, order: any) => sum + (order.amountUsd || 0), 0),
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged');
    router.push('/06620676830610209229/login');
  };

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: HomeIcon },
    { id: 'data' as Tab, name: 'Data', icon: TableCellsIcon },
    { id: 'analytics' as Tab, name: 'Analytics', icon: ChartPieIcon },
    { id: 'settings' as Tab, name: 'Settings', icon: WrenchScrewdriverIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-slate-400">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo/Title */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
              <p className="text-slate-400 text-sm">
                {activeTab === 'dashboard' && 'Overview of your system'}
                {activeTab === 'data' && 'Manage collected data'}
                {activeTab === 'analytics' && 'Traffic and performance insights'}
                {activeTab === 'settings' && 'System configuration'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-400 text-sm">Online</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <UsersIcon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600/20 rounded-lg">
                      <ShoppingBagIcon className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Total Orders</p>
                      <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <ChartBarIcon className="w-8 h-8 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Revenue</p>
                      <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-white text-sm">Dashboard loaded successfully</p>
                      <p className="text-slate-400 text-xs">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-white text-sm">Data synchronized</p>
                      <p className="text-slate-400 text-xs">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              {/* Client Data Table */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-semibold text-white">Client Data</h3>
                  <p className="text-slate-400 text-sm mt-1">Collected user information</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {clientData.length > 0 ? clientData.map((client: any, index: number) => (
                        <tr key={index} className="hover:bg-slate-700/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{client.fullName || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{client.email || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{client.region || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">View</button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No client data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-semibold text-white">Orders</h3>
                  <p className="text-slate-400 text-sm mt-1">Transaction records</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {orderData.length > 0 ? orderData.slice(0, 10).map((order: any) => (
                        <tr key={order.id} className="hover:bg-slate-700/30">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{order.fullName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.paymentStatus === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.paymentStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${order.amountUsd || '0.00'}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No orders available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Page Views</p>
                      <p className="text-2xl font-bold text-white">1,234</p>
                    </div>
                    <ChartBarIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-green-400 text-sm mt-2">+12% from last month</p>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Unique Visitors</p>
                      <p className="text-2xl font-bold text-white">856</p>
                    </div>
                    <UsersIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-green-400 text-sm mt-2">+8% from last month</p>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Conversion Rate</p>
                      <p className="text-2xl font-bold text-white">3.2%</p>
                    </div>
                    <ChartPieIcon className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-red-400 text-sm mt-2">-2% from last month</p>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Avg. Session</p>
                      <p className="text-2xl font-bold text-white">4m 32s</p>
                    </div>
                    <CogIcon className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-green-400 text-sm mt-2">+15% from last month</p>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Traffic Overview</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-600 rounded-lg">
                  <div className="text-center">
                    <ChartBarIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Charts will be implemented here</p>
                    <p className="text-slate-500 text-sm">Using Chart.js or similar library</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-slate-400 text-sm">Temporarily disable the site</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors">
                      Disabled
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">Receive order notifications</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors">
                      Enabled
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Data Export</p>
                      <p className="text-slate-400 text-sm">Export client data</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
