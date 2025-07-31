// src/components/TopBar.jsx
import React from 'react';
import { Menu } from 'lucide-react'; // Import Menu icon

const TopBar = ({ setIsSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)} // Open sidebar
        className="text-text-dark p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent"
      >
        <Menu className="text-2xl" />
      </button>
      <h2 className="text-xl font-semibold text-text-dark">Admin Dashboard</h2>
      <div></div> {/* Placeholder for right-aligned items if needed */}
    </header>
  );
};

export default TopBar;
