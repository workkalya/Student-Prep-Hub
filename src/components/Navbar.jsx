
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Update theme and save to localStorage
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'blue-theme', 'green-theme');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-800 blue-theme:to-blue-900 green-theme:from-green-600 green-theme:to-teal-600 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Student Prep Hub
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link to="/quiz" className="hover:text-blue-200 transition">
            Quiz
          </Link>
          <Link to="/history" className="hover:text-blue-200 transition">
            History
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition"
              aria-label="Toggle theme"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={theme === 'dark' ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"}
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => toggleTheme('light')}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Light
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dark
                </button>
                <button
                  onClick={() => toggleTheme('blue-theme')}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Blue
                </button>
                <button
                  onClick={() => toggleTheme('green-theme')}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Green
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
