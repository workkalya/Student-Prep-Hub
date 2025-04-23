
import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import Modal from '../components/Modal.jsx';
import ResultsModal from '../components/ResultsModal.jsx';

function Quiz() {
  const { mcqs, userAnswers, setUserAnswers, submitQuiz, selectedSubject, selectedDifficulty } = useQuiz();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [quizResults, setQuizResults] = useState({ score: 0, timeTaken: '', satisfactionLevel: '', satisfactionColor: '' });

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('quizProgress'));
    if (savedProgress && savedProgress.subject === selectedSubject) {
      setUserAnswers(savedProgress.answers);
      setTimeLeft(savedProgress.timeLeft);
    }
  }, [selectedSubject, setUserAnswers]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save progress to localStorage when userAnswers or timeLeft changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('quizProgress', JSON.stringify({
        subject: selectedSubject,
        answers: userAnswers,
        timeLeft,
      }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [userAnswers, timeLeft, selectedSubject]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playSound = () => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/01/06/audio_1e3e433a75.mp3');
    audio.play().catch(() => console.log('Audio playback failed'));
  };

  const calculateSatisfactionLevel = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return { text: 'Excellent', color: 'text-green-500' };
    if (percentage >= 50) return { text: 'Good', color: 'text-green-500' };
    return { text: 'Needs Improvement', color: 'text-red-500' };
  };

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    setError('');
    playSound();
  };

  const handleSubmit = () => {
    const unanswered = mcqs.length - Object.keys(userAnswers).length;
    if (unanswered > 0) {
      setError(`Please answer all ${mcqs.length} questions before submitting.`);
      return;
    }
    setIsModalOpen(true);
  };

  const confirmSubmit = () => {
    // Calculate score
    let newScore = 0;
    mcqs.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.correctAnswer) {
        newScore += 1;
      }
    });

    const timeTakenSeconds = 15 * 60 - timeLeft;
    const timeTaken = formatTime(timeTakenSeconds);
    const { text: satisfactionLevel, color: satisfactionColor } = calculateSatisfactionLevel(newScore, mcqs.length);

    // Set results for the modal
    setQuizResults({
      score: newScore,
      timeTaken,
      satisfactionLevel,
      satisfactionColor,
    });

    // Show results modal
    setIsModalOpen(false);
    setIsResultsModalOpen(true);

    // Submit quiz to context
    submitQuiz(timeTaken);
    localStorage.removeItem('quizProgress');
    playSound();
  };

  const handleViewDetails = () => {
    setIsResultsModalOpen(false);
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-200 blue-theme:to-blue-400 green-theme:from-green-200 green-theme:to-teal-400 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 animate-fadeIn">
            {selectedSubject} Quiz ({selectedDifficulty})
          </h2>
          <div className="text-lg font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar completed={(Object.keys(userAnswers).length / mcqs.length) * 100} />
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 blue-theme:bg-red-200 green-theme:bg-red-200 text-red-600 dark:text-red-200 blue-theme:text-red-800 green-theme:text-red-800 rounded-lg animate-fadeIn">
            {error}
          </div>
        )}
        <div className="space-y-6">
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-4 sm:p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition animate-fadeIn"
            >
              <p className="text-lg font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-4">
                {index + 1}. {mcq.question}
              </p>
              <div className="grid gap-3">
                {mcq.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center p-3 rounded-lg border ${
                      userAnswers[index] === option
                        ? 'bg-blue-100 dark:bg-blue-900 blue-theme:bg-blue-200 green-theme:bg-green-200 border-blue-500 dark:border-blue-600 blue-theme:border-blue-600 green-theme:border-green-600'
                        : 'bg-gray-50 dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 border-gray-300 dark:border-gray-600 blue-theme:border-blue-500 green-theme:border-green-500'
                    } hover:bg-blue-50 dark:hover:bg-gray-600 blue-theme:hover:bg-blue-200 green-theme:hover:bg-green-200 transition cursor-pointer transform hover:scale-105`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      className="mr-3 accent-blue-500 dark:accent-blue-600 blue-theme:accent-blue-600 green-theme:accent-green-600"
                    />
                    <span className="text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-gradient-to-r from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-600 green-theme:to-teal-700 text-white p-3 rounded-lg hover:from-green-600 hover:to-teal-700 dark:hover:from-green-700 dark:hover:to-teal-800 blue-theme:hover:from-blue-700 blue-theme:hover:to-blue-900 transition w-full sm:w-48 mx-auto block animate-fadeIn transform hover:scale-105"
        >
          Submit Quiz
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSubmit}
        title="Confirm Submission"
        message="Are you sure you want to submit your quiz?"
      />
      <ResultsModal
        isOpen={isResultsModalOpen}
        onClose={handleViewDetails}
        score={quizResults.score}
        total={mcqs.length}
        timeTaken={quizResults.timeTaken}
        satisfactionLevel={quizResults.satisfactionLevel}
        satisfactionColor={quizResults.satisfactionColor}
      />
    </div>
  );
}

export default Quiz;
