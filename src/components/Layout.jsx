import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">
            🎓 FullStack University
          </h1>
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold underline underline-offset-4'
                  : 'hover:text-indigo-600 transition duration-300 hover:underline underline-offset-4'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold underline underline-offset-4'
                  : 'hover:text-indigo-600 transition duration-300 hover:underline underline-offset-4'
              }
            >
              Students
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold underline underline-offset-4'
                  : 'hover:text-indigo-600 transition duration-300 hover:underline underline-offset-4'
              }
            >
              Add Student
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-indigo-100 text-center py-4 text-sm text-gray-700">
        &copy; {new Date().getFullYear()} FullStack University · All rights reserved
      </footer>
    </div>
  );
};

export default Layout;
