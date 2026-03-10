import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetails from './pages/SubjectDetails';
import PracticalIDE from './pages/PracticalIDE';
import PYQCodePage from './pages/PYQCodePage';
import MCQPage from './pages/MCQPage';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/practical/:id" element={<PracticalIDE />} />
        <Route path="/pyq-code/:id" element={<PYQCodePage />} />
        <Route path="/mcq/:id" element={<MCQPage />} />
        <Route path="/test/:id" element={<TakeTest />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/subjects/:id" element={<SubjectDetails />} />
                <Route path="/tests" element={<Tests />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
