import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Analytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [salesRes, topRes] = await Promise.all([
          fetch('/api/analytics/sales'),
          fetch('/api/analytics/top-products'),
        ]);
        if (!salesRes.ok || !topRes.ok) throw new Error('Failed to load analytics');

        setSalesData(await salesRes.json());
        setTopProducts(await topRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <Loader2 className="animate-spin text-primary-accent mr-3" size={32} />
        <p className="text-lg text-text-medium">Loading analytics...</p>
      </div>
    );

  if (error)
    return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;

  return (
    <div className="grid gap-6">
      {/* Sales trend */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4">
          Sales (last 30 days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top products */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4">
          Top Products
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
