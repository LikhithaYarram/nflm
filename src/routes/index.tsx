import { RouteObject, Navigate } from 'react-router-dom';
import Home from '../Home';
import NutritionFactsCustomization from '../NutritionFactsCustomization';
import Login from '../Login';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
    index: true,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-label',
    element: (
      <ProtectedRoute>
        <NutritionFactsCustomization />
      </ProtectedRoute>
    ),
  },
  {
    path: '/view-label',
    element: (
      <ProtectedRoute>
        <NutritionFactsCustomization />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]; 