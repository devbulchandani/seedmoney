import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetails from './pages/SubjectDetails';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-brand-gray flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects/:id" element={<SubjectDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
