import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken'); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
