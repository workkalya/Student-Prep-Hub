
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import History from './pages/History.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 lg:pl-64 pt-20 lg:pt-24">
          <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-12rem)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
