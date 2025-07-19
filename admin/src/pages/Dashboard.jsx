import React, { useEffect, useState } from 'react';
import { FiEye, FiBarChart2, FiDownload, FiDollarSign } from 'react-icons/fi';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    impressions: 0,
    clicks: 0,
    downloads: 0,
    revenuePKR: 0,
    revenueUSD: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getAllStats();
        if (res.data.success) {
          const totals = res.data.totals;
          setStats({
            impressions: totals.impressions,
            clicks: totals.clicks,
            downloads: totals.downloads,
            revenuePKR: totals.revenuePKR,
            revenueUSD: totals.revenueUSD,
          });
        } else {
          console.error('Error in response:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    {
      label: 'Total Impressions',
      value: stats.impressions,
      icon: <FiEye className="text-blue-600" />,
    },
    {
      label: 'Total Clicks',
      value: stats.clicks,
      icon: <FiBarChart2 className="text-green-600" />,
    },
    {
      label: 'Downloads',
      value: stats.downloads,
      icon: <FiDownload className="text-purple-600" />,
    },
    {
      label: 'Revenue (USD)',
      value: `$${stats.revenueUSD.toFixed(2)}`,
      icon: <FiDollarSign className="text-green-600" />,
    },
    {
      label: 'Revenue (PKR)',
      value: `₨ ${stats.revenuePKR.toLocaleString()}`,
      icon: <FiDollarSign className="text-yellow-500" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h1>

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cardData.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-5 rounded-2xl border-l-4 border-blue-500 hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <h4 className="text-sm text-gray-500">{stat.label}</h4>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
