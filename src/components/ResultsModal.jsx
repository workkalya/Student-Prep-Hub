
function ResultsModal({ isOpen, onClose, score, total, timeTaken, satisfactionLevel, satisfactionColor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-6 rounded-xl shadow-lg max-w-sm w-full animate-fadeIn">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-4">
          Quiz Results
        </h3>
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-2">
            You scored {score} out of {total}
          </p>
          <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
            Satisfaction Level: <span className={`font-bold ${satisfactionColor}`}>{satisfactionLevel}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600 mt-2">
            Time Taken: {timeTaken}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;
