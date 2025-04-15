import React, { useState } from 'react';
import { LogoutService } from '../services/auth/logout';
import { LogOut } from "lucide-react"; // optional: using lucide-react logout icon
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ responses = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const success = await LogoutService();
      if (success) {
        toast.success('Logout successful');
        window.location.href = '/';
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during logout');
      console.error('Logout error:', error);
    }
  };
  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path ? 'bg-blue-900 text-white' : 'text-blue-900 hover:bg-blue-50';

  return (
    <>
      {/* Mobile menu toggle button - only visible on small screens */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-md text-blue-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar - full size on desktop, slide-in on mobile */}
      <div className={`fixed md:relative h-screen z-10 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="w-64 md:w-72 h-full bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-blue-900/20">
            <h2 className="text-xl font-semibold text-blue-900 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Dashboard
            </h2>
          </div>

          {/* Main Navigation Menu */}
          <div className="p-2">
            <nav className="space-y-1">
              {/* Home */}
              <Link to="/dashboard" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/dashboard')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>

              {/* Daily Content */}
              <Link to="/programs/daily" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/programs/daily')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Daily Content</span>
              </Link>

              {/* Programs */}
              <Link to="/programs" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/programs')}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Programs</span>
              </Link>
            </nav>
          </div>

          {/* Empty responses area - simplified */}
          <div className="flex-1 overflow-y-auto px-4 py-6"></div>

          {/* Account Settings at footer */}
          <div className="mt-auto border-t border-blue-900/10">
            <div className="p-3">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md shadow-sm hover:bg-blue-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2 text-blue-600" />
                <span>Logout</span>
              </button>





              <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-blue-900 hover:bg-blue-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-900/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Account Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-transparent z-0 backdrop-blur-md backdrop-brightness-50"
          onClick={toggleMobileMenu}
        />
      )}

    </>
  );
};

export default Sidebar;
