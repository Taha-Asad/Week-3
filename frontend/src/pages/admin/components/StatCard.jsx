import React from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'; // Import Lucide icons

const StatCard = ({ title, value, icon: IconComponent }) => ( // Renamed 'icon' to 'IconComponent' for clarity
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
    <div>
      <p className="text-text-medium text-xs sm:text-sm font-semibold">{title}</p>
      <h3 className="text-2xl sm:text-3xl font-bold text-text-dark mt-1">{value}</h3>
    </div>
    <div className="text-primary-accent text-3xl sm:text-4xl ml-4">
      {IconComponent && <IconComponent size={32} />} {/* Render the icon component */}
    </div>
  </div>
);

export default StatCard;
