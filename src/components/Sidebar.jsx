
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext.jsx';

function Sidebar() {
  const { selectedSubject, selectedDifficulty } = useQuiz();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-16 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`w-64 bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 h-screen p-6 shadow-lg fixed transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-40 top-0 pt-16 flex flex-col justify-between overflow-y-auto`}
      >
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-6">
            Quiz Dashboard
          </h3>
          <div className="space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg bg-blue-100 dark:bg-blue-900 blue-theme:bg-blue-200 green-theme:bg-green-200 text-blue-600 dark:text-blue-200 blue-theme:text-blue-800 green-theme:text-green-800 hover:bg-blue-200 dark:hover:bg-blue-800 blue-theme:hover:bg-blue-300 green-theme:hover:bg-green-300 transition transform hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/quiz"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 hover:bg-gray-200 dark:hover:bg-gray-600 blue-theme:hover:bg-blue-200 green-theme:hover:bg-green-200 transition transform hover:scale-105"
            >
              Take Quiz
            </Link>
            <Link
              to="/results"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 hover:bg-gray-200 dark:hover:bg-gray-600 blue-theme:hover:bg-blue-200 green-theme:hover:bg-green-200 transition transform hover:scale-105"
            >
              View Results
            </Link>
            <Link
              to="/history"
              onClick={() => setIsOpen(false)}
              className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 hover:bg-gray-200 dark:hover:bg-gray-600 blue-theme:hover:bg-blue-200 green-theme:hover:bg-green-200 transition transform hover:scale-105"
            >
              Quiz History
            </Link>
          </div>
          <div className="mt-8">
            <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
              Current Quiz: {selectedSubject || 'None'} ({selectedDifficulty})
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 blue-theme:text-blue-500 green-theme:text-green-500 text-sm">
          Made with ❤️ by Abdullah Habib
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
