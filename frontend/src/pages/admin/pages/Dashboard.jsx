import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await fetch('/api/analytics/summary');
  //       if (!res.ok) throw new Error('Failed to load stats');
  //       setStats(await res.json());
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchStats();
  // }, []);

  if (loading) return null;
  if (error)   return toast.error(error.message);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <StatCard title="Total Sales"    value={`$${stats.totalSales}`}  icon={DollarSign} />
      <StatCard title="New Orders"     value={stats.newOrders}         icon={ShoppingCart} />
      <StatCard title="Products"       value={stats.productCount}      icon={Package} />
      <StatCard title="New Customers"  value={stats.newCustomers}      icon={Users} />
    </div>
  );
};

export default Dashboard;
