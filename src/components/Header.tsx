import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiChevronDown, FiMenu } from 'react-icons/fi';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus management for dropdown
  useEffect(() => {
    if (isDropdownOpen && firstFocusableElementRef.current) {
      firstFocusableElementRef.current.focus();
    }
  }, [isDropdownOpen]);

  // Handle keyboard controls for dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Handle Tab key for focus trapping
  const handleKeyDownForDropdown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // If shift-tabbing from first element, close the dropdown
        if (document.activeElement === firstFocusableElementRef.current) {
          e.preventDefault();
          setIsDropdownOpen(false);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-secondary dark:bg-bg-secondary text-text-primary dark:text-text-primary px-6 py-4 border-b border-border-color shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile menu button - only visible on mobile */}
          <button
            className="p-2 mr-4 rounded-md text-text-primary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <FiMenu size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-text-secondary dark:text-text-secondary">Welcome back! Here's your overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-text-primary dark:text-text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={handleKeyDown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-label="User profile menu"
            >
              <FiUser className="mr-2" />
              <span>Profile</span>
              <FiChevronDown className={`ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-bg-secondary dark:bg-bg-secondary shadow-lg rounded-md py-2 z-50 border border-border-color"
                onKeyDown={handleKeyDownForDropdown}
              >
                <button
                  ref={firstFocusableElementRef}
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-text-primary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <FiLogOut className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
