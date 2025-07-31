// src/pages/OrdersList.jsx
import React from 'react';
import { dummyOrders } from '@/utils/dummyData'; 

const OrdersList = () => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <h2 className="text-xl sm:text-2xl font-semibold text-text-dark mb-4">Recent Orders</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-bg-secondary">
          <tr>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider rounded-tl-lg">Order ID</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Customer</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Total</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-text-dark uppercase tracking-wider rounded-tr-lg">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dummyOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-text-dark">{order.id}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">{order.customer}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                  ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                  ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${order.status === 'Pending' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-text-medium">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersList;
