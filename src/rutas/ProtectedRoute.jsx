import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.admin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
