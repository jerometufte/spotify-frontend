import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './paths';

export default function PrivateRoute() {
  const token = localStorage.getItem('access_token');
  
  return token ? <Outlet /> : <Navigate to={PATHS.HOME} />;
} 