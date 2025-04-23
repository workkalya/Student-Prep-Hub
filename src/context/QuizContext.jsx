
import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);

  const generateMcqs = async (subject, difficulty) => {
    try {
      const prompt = `Generate 10 multiple-choice questions for ${subject} at ${difficulty} level. Each question should have 4 options and one correct answer. Format as JSON with question, options (array), and correctAnswer.`;
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      const cleanedText = generatedText.replace(/```json\n|\n```/g, '');
      const questions = JSON.parse(cleanedText);
      setMcqs(questions);
      setUserAnswers({});
      setScore(0);
      return true;
    } catch (error) {
      console.error('Error generating MCQs:', error);
      return false;
    }
  };

  const submitQuiz = (timeTaken) => {
    let newScore = 0;
    mcqs.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setQuizHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        score: newScore,
        total: mcqs.length,
        timeTaken,
        date: new Date().toLocaleString(),
      },
    ]);
  };

  return (
    <QuizContext.Provider
      value={{
        selectedSubject,
        setSelectedSubject,
        selectedDifficulty,
        setSelectedDifficulty,
        mcqs,
        setMcqs,
        userAnswers,
        setUserAnswers,
        score,
        setScore,
        quizHistory,
        setQuizHistory,
        generateMcqs,
        submitQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
