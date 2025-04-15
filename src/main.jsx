import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import DashboardPage from './pages/dashboard';
import DailyContent from './pages/dailystudy';
import Programs from './pages/program';
import CreateDailyPage from './pages/createprogram';
import RequestReset from './pages/request-reset';
import OTPPage from './pages/verify-request';
import NewPassword from './pages/newpassword';
import ProtectedRoute from './components/ProtectedRoute'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="programs"
            element={
              <ProtectedRoute>
                <Programs />
              </ProtectedRoute>
            }
          />
          <Route
            path="programs/daily"
            element={
              <ProtectedRoute>
                <DailyContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="programs/daily/add"
            element={
              <ProtectedRoute>
                <CreateDailyPage />
              </ProtectedRoute>
            }
          />
          <Route path="request-reset" element={<RequestReset />} />
          <Route path="verify-otp" element={<OTPPage />} />
          <Route path="new-password" element={<NewPassword />} />
        </Routes>
        <ToastContainer />
      </>
    </Router>
  </StrictMode>
);
