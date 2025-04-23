
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { QuizProvider } from './context/QuizContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QuizProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuizProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
