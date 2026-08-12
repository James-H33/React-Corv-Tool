import { Navigate } from 'react-router-dom';
import Views from './Views';
import CarsList from './cars/cars-list/CarsList';
import Car from './cars/car/Car';

export const viewsRoutes = [
  {
    path: '/v',
    element: <Views />,
    children: [
      {
        index: true,
        element: <Navigate to="cars" replace />,
      },
      {
        path: 'cars',
        element: <CarsList />,
      },
      {
        path: 'cars/:id',
        element: <Car />,
      },
    ],
  },
];
