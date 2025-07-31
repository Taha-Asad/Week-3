import React, { useState } from 'react';
import Dashboard from '../pages/Dashboard';
import ProductsList from '../pages/ProductList';
import OrdersList from '../pages/OrdersList';
import CustomersList from '../pages/CustomersList';
import Settings from '../pages/Settings';
import Analytics from '../pages/Analytics';
import { colors } from '../../../utils/color.js';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsList />;
      case 'orders':
        return <OrdersList />;
      case 'customers':
        return <CustomersList />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen font-inter overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        :root {
          --color-bg-light: ${colors['bg-light']};
          --color-bg-secondary: ${colors['bg-secondary']};
          --color-primary-accent: ${colors['primary-accent']};
          --color-text-dark: ${colors['text-dark']};
          --color-text-medium: ${colors['text-medium']};
        }
        .bg-bg-light { background-color: var(--color-bg-light); }
        .bg-bg-secondary { background-color: var(--color-bg-secondary); }
        .bg-primary-accent { background-color: var(--color-primary-accent); }
        .text-text-dark { color: var(--color-text-dark); }
        .text-text-medium { color: var(--color-text-medium); }
        .hover\\:bg-opacity-90:hover { background-color: color-mix(in srgb, var(--color-primary-accent) 90%, transparent); }
        .focus\\:ring-primary-accent:focus { --tw-ring-color: var(--color-primary-accent); }
        .border-primary-accent { border-color: var(--color-primary-accent); }
        .text-primary-accent { color: var(--color-primary-accent); }
      `}</style>

      {/* ───────── Desktop sidebar ───────── */}
      <div className="hidden md:flex md:flex-col w-64 bg-text-dark text-white p-6 rounded-r-lg shadow-lg">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* ───────── Mobile sidebar ───────── */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-text-dark text-white p-6 z-50 shadow-lg rounded-r-lg">
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </>
      )}

      {/* ───────── Main content ───────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-4 sm:mb-6 hidden md:block">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
