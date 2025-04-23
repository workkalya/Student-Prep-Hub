
import { useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function Home() {
  const { selectedSubject, setSelectedSubject, setSelectedDifficulty, selectedDifficulty, generateMcqs } = useQuiz();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const subjects = [
    'Math',
    'Science',
    'History',
    'Islamiat',
    'Quran Translations',
    'English',
    'Geography',
    'Computer Science',
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const quotes = {
    Islamiat: 'Seek knowledge from the cradle to the grave. - Prophet Muhammad (PBUH)',
    'Quran Translations': 'The Quran is a guidance for those who are conscious of Allah. - Quran 2:2',
    default: 'Education is the most powerful weapon you can use to change the world. - Nelson Mandela',
  };

  const playSound = () => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/01/06/audio_1e3e433a75.mp3');
    audio.play().catch(() => console.log('Audio playback failed'));
  };

  const handleStartQuiz = async (subject, difficulty) => {
    setIsLoading(true);
    setSelectedSubject(subject);
    setSelectedDifficulty(difficulty);
    const success = await generateMcqs(subject, difficulty);
    setIsLoading(false);
    if (success) {
      playSound();
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-200 blue-theme:to-blue-400 green-theme:from-green-200 green-theme:to-teal-400 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-4 animate-fadeIn">
          Student Prep Hub
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 blue-theme:text-blue-600 green-theme:text-green-600 mb-6 animate-fadeIn">
          Made with ❤️ by Abdullah Habib
        </p>
        <p className="text-center text-sm sm:text-lg italic text-gray-700 dark:text-gray-200 blue-theme:text-blue-700 green-theme:text-green-700 mb-8 animate-fadeIn">
          "{quotes[selectedSubject] || quotes.default}"
        </p>
        <div className="max-w-md sm:max-w-lg lg:max-w-2xl mx-auto bg-white dark:bg-gray-800 blue-theme:bg-blue-50 green-theme:bg-green-50 p-6 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white blue-theme:text-blue-800 green-theme:text-green-800 mb-4">
            Start Your Quiz
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 blue-theme:text-blue-700 green-theme:text-green-700 mb-2">
              Select Subject
            </label>
            <select
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 blue-theme:border-blue-500 green-theme:border-green-500 bg-white dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 blue-theme:focus:ring-blue-600 green-theme:focus:ring-green-600"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 blue-theme:text-blue-700 green-theme:text-green-700 mb-2">
              Select Difficulty
            </label>
            <div className="flex gap-3 sm:gap-4">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    playSound();
                  }}
                  className={`flex-1 p-3 rounded-lg border ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 blue-theme:bg-blue-600 green-theme:bg-green-600'
                      : 'bg-white dark:bg-gray-700 blue-theme:bg-blue-100 green-theme:bg-green-100 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 blue-theme:border-blue-500 green-theme:border-green-500'
                  } hover:bg-blue-100 dark:hover:bg-gray-600 blue-theme:hover:bg-blue-200 green-theme:hover:bg-green-200 transition transform hover:scale-105`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() =>
              selectedSubject &&
              selectedDifficulty &&
              handleStartQuiz(selectedSubject, selectedDifficulty)
            }
            disabled={isLoading || !selectedSubject || !selectedDifficulty}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 blue-theme:from-blue-600 blue-theme:to-blue-800 green-theme:from-green-500 green-theme:to-teal-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 blue-theme:hover:from-blue-700 blue-theme:hover:to-blue-900 green-theme:hover:from-green-600 green-theme:hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center transform hover:scale-105"
          >
            {isLoading ? <LoadingSpinner /> : 'Start Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
