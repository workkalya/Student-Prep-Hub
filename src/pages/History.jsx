
import { useQuiz } from '../context/QuizContext.jsx';
import { Link } from 'react-router-dom';

function History() {
  const { quizHistory } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-200 blue-theme:to-blue-400 green-theme:from-green-200 green-theme:to-teal-400 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-6 animate-fadeIn">
          Quiz History
        </h2>
        {quizHistory.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg animate-fadeIn">
            <p className="text-lg text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
              No quizzes taken yet. Start a quiz to see your history!
            </p>
            <Link
              to="/"
              className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
            >
              Start Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-md sm:max-w-lg lg:max-w-3xl mx-auto">
            {quizHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition animate-fadeIn"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800">
                  {entry.subject} ({entry.difficulty})
                </p>
                <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
                  Score: {entry.score}/{entry.total}
                </p>
                <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
                  Time Taken: {entry.timeTaken}
                </p>
                <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
                  Date: {entry.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
