import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Login from './pages/login';
import DashboardPage from './pages/dashboard';
import DailyContent from './pages/dailystudy';
import Programs from './pages/program';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="program" element={<Programs />} />
        <Route path="program/daily" element={<DailyContent />} />
      </Routes>
    </Router>
  </StrictMode>
);
