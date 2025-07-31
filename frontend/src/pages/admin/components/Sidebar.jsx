import React from 'react';
import {
  Store,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, setIsSidebarOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
    { name: 'Products',  icon: Package,          section: 'products'  },
    { name: 'Orders',    icon: ShoppingCart,     section: 'orders'    },
    { name: 'Customers', icon: Users,            section: 'customers' },
    { name: 'Analytics', icon: BarChart2,        section: 'analytics' },
    { name: 'Settings',  icon: Settings,         section: 'settings'  },
  ];

  return (
    <aside className="w-full h-full flex flex-col">
      <div className="flex items-center mb-10">
        <Store className="text-primary-accent text-3xl mr-3" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-grow">
        <ul>
          {navItems.map(({ name, icon: Icon, section }) => (
            <li key={section} className="mb-4">
              <button
                onClick={() => {
                  setActiveSection(section);
                  setIsSidebarOpen(false); // close on mobile
                }}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors
                  ${
                    activeSection === section
                      ? 'bg-primary-accent text-white'
                      : 'hover:bg-text-medium text-[#2292A2]'
                  }`}
              >
                <Icon className="mr-3" size={20} />
                <span className="text-base">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button className="mt-auto flex items-center w-full p-3 rounded-lg text-left text-black hover:bg-text-medium transition-colors">
        <LogOut className="mr-3" size={20} />
        <span className="text-base">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
