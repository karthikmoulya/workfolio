import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import Pagination from './routes/pagination';
import ErrorPage from './error-page';

import './index.css';
import Tictactoe from './routes/tictactoe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/pagination',
        element: <Pagination />,
      },
      {
        path: '/tictactoe',
        element: <Tictactoe />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
