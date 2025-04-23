
import { useQuiz } from '../context/QuizContext.jsx';
import { Link } from 'react-router-dom';

function Results() {
  const { score, mcqs, userAnswers, selectedSubject, selectedDifficulty, quizHistory } = useQuiz();
  const latestQuiz = quizHistory[quizHistory.length - 1] || {};

  const satisfactionLevel = () => {
    const percentage = (score / mcqs.length) * 100;
    if (percentage >= 80) return { text: 'Excellent', color: 'text-green-500' };
    if (percentage >= 50) return { text: 'Good', color: 'text-green-500' };
    return { text: 'Needs Improvement', color: 'text-red-500' };
  };

  const { text: satisfactionText, color: satisfactionColor } = satisfactionLevel();

  const playSound = () => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/01/06/audio_1e3e433a75.mp3');
    audio.play().catch(() => console.log('Audio playback failed'));
  };

  const shareResults = () => {
    const text = `I scored ${score}/${mcqs.length} on my ${selectedSubject} quiz (${selectedDifficulty})! Satisfaction: ${satisfactionText}. Try it out at Student Prep Hub!`;
    navigator.clipboard.writeText(text);
    alert('Results copied to clipboard!');
    playSound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-200 blue-theme:to-blue-400 green-theme:from-green-200 green-theme:to-teal-400 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-6 animate-fadeIn">
          {selectedSubject} Quiz Results ({selectedDifficulty})
        </h2>
        <div className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg mb-6 text-center animate-fadeIn">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-2">
            You scored {score} out of {mcqs.length}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
            Satisfaction Level: <span className={`font-bold ${satisfactionColor}`}>{satisfactionText}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600 mt-2">
            Time Taken: {latestQuiz.timeTaken}
          </p>
          <button
            onClick={shareResults}
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition transform hover:scale-105"
          >
            Share Results
          </button>
        </div>
        <div className="space-y-6 max-w-md sm:max-w-lg lg:max-w-3xl mx-auto">
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition animate-fadeIn"
            >
              <p className="text-lg font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-2">
                {index + 1}. {mcq.question}
              </p>
              <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
                Your Answer: {userAnswers[index] || 'Not answered'}
              </p>
              <p className="text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600">
                Correct Answer: {mcq.correctAnswer}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition animate-fadeIn transform hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            to="/history"
            className="bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition animate-fadeIn transform hover:scale-105"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
