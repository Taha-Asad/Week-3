import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import DashboardLayout from './pages/admin/layout/DashboardLayout';

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#D9D4D1] text-[#3D444B]">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Add the DashboardLayout route */}
            <Route path="/dashboard" element={<DashboardLayout />} />
            {/* Optional: A default route, e.g., redirect to login */}
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
