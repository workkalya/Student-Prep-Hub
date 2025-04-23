
function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-6 rounded-xl shadow-lg max-w-sm w-full animate-fadeIn">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600 mb-6">
          {message}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 blue-theme:bg-blue-200 green-theme:bg-green-200 text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
