import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}: {children:React.ReactNode}) => {
    const userName = localStorage.getItem("userName");
    if (!userName?.trim()) {
      return <Navigate to="/" />
    }
  return (
    children
  );
};

export default ProtectedRoute