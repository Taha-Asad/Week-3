import React from 'react';
import { dummyCustomers } from '@/utils/dummyData';

const CustomersList = () => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <h2 className="text-xl sm:text-2xl font-semibold text-text-dark mb-4">Customers</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-bg-secondary">
          <tr>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider rounded-tl-lg">ID</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Email</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Orders</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider rounded-tr-lg">Total Spent</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dummyCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-text-dark">{customer.id}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">{customer.name}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">{customer.email}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">{customer.orders}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">${customer.totalSpent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CustomersList;
