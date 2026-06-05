import React from 'react';
// PARTNER LINKS: Connecting admin modular pieces
import DashboardCard from '../../components/admin/DashboardCard';
import DataTable from '../../components/admin/DataTable';

const Dashboard = () => {
    // Temporary analytical dummy data until API services are fully hooked up by partners
    const stats = [
        { title: 'Total Revenue', value: '$48,259.45', change: '+12%', isPositive: true },
        { title: 'Active Orders', value: '142', change: '+4%', isPositive: true },
        { title: 'New Customers', value: '1,240', change: '-2%', isPositive: false },
        { title: 'Stock Alerts', value: '5 Items', valueColor: 'text-red-600' }
    ];

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overviews</h1>
                <p className="text-sm text-gray-500">Welcome back, admin. Here is today's store performance summary.</p>
            </div>

            {/* Grid Layout for Metrics Cards */}
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <DashboardCard key={idx} {...stat} />
                ))}
            </section>

            {/* Grid Layout for Recent Data/Logs */}
            <section className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="sm:flex sm:items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
                        <p className="mt-1 text-sm text-gray-500">A detailed summary of recent user purchases.</p>
                    </div>
                </div>
                <DataTable type="recentOrders" />
            </section>
        </div>
    );
};

export default Dashboard;