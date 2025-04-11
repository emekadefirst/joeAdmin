import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Login from './pages/login';
import DashboardPage from './pages/dashboard';
import DailyContent from './pages/dailystudy';
import Programs from './pages/program';
import CreateDailyPage from './pages/createprogram';
import RequestReset from './pages/request-reset';
import OTPPage from './pages/verify-request';
import NewPassword from './pages/newpassword';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="programs" element={<Programs />} />
        <Route path="programs/daily" element={<DailyContent />} />
        <Route path="request-reset" element={<RequestReset />} />
        <Route path="verify-otp" element={<OTPPage />} />
        <Route path='new-password' element={<NewPassword />} />
        <Route path="programs/daily/add" element={<CreateDailyPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
