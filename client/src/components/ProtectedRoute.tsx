import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Layout } from './Layout';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}
