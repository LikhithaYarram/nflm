import { RouteObject, Navigate } from 'react-router-dom';
import Home from '../Home';
import NutritionFactsCustomization from '../NutritionFactsCustomization';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/create-label',
    element: <NutritionFactsCustomization />,
  },
  {
    path: '/view-label',
    element: <NutritionFactsCustomization />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]; 