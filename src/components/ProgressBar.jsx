
function ProgressBar({ completed }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-600 blue-theme:bg-blue-200 green-theme:bg-green-200 rounded-full h-4 mb-6">
      <div
        className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-500 green-theme:to-teal-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${completed}%` }}
      />
    </div>
  );
}

export default ProgressBar;
