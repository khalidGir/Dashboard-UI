import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiSettings, FiDatabase, FiX, FiBarChart2 } from 'react-icons/fi';
import { useUIStore } from '../store/useUIStore';

const Sidebar = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const closeSidebar = useUIStore((state) => state.closeSidebar);

  // Manage focus when sidebar opens/closes
  useEffect(() => {
    if (isSidebarOpen) {
      // Focus the close button when sidebar opens
      const closeButton = document.querySelector('#sidebar-close-btn');
      if (closeButton) {
        (closeButton as HTMLElement).focus();
      }
    }
  }, [isSidebarOpen]);

  // Handle keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  };

  // Close sidebar on backdrop click
  const handleBackdropClick = () => {
    closeSidebar();
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-bg-secondary dark:bg-bg-secondary shadow-md min-h-[calc(100vh-64px)] fixed top-[64px] left-0 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex justify-end p-4 md:hidden">
            <button
              id="sidebar-close-btn"
              onClick={closeSidebar}
              className="p-1 rounded-md text-text-primary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close navigation menu"
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="flex flex-col p-4 flex-1" aria-label="Main navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-md text-text-secondary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? 'bg-bg-tertiary dark:bg-bg-tertiary font-semibold text-text-primary dark:text-text-primary shadow-sm'
                    : 'hover:translate-x-1'
                }`
              }
              onClick={closeSidebar} // Close sidebar when clicking a link on mobile
            >
              <FiBarChart2 className="mr-3" aria-hidden="true" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/data-table"
              className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-md text-text-secondary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? 'bg-bg-tertiary dark:bg-bg-tertiary font-semibold text-text-primary dark:text-text-primary shadow-sm'
                    : 'hover:translate-x-1'
                }`
              }
              onClick={closeSidebar} // Close sidebar when clicking a link on mobile
            >
              <FiDatabase className="mr-3" aria-hidden="true" />
              <span>Data Table</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded-md text-text-secondary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? 'bg-bg-tertiary dark:bg-bg-tertiary font-semibold text-text-primary dark:text-text-primary shadow-sm'
                    : 'hover:translate-x-1'
                }`
              }
              onClick={closeSidebar} // Close sidebar when clicking a link on mobile
            >
              <FiSettings className="mr-3" aria-hidden="true" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
