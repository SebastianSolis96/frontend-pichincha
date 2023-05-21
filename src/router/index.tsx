import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
const ListView = lazy( () => import('../products/views/ListView') );
const FormView = lazy( () => import('../products/views/FormView') );

export const router = createBrowserRouter([
  {
    path: '/products',
    element: <App />,
    children: [
        { path: 'list', element: 
          <Suspense fallback={<div>Cargando...</div>}>
            <ListView />
          </Suspense>,  
        },
        { path: 'form/:productId?', element: 
          <Suspense fallback={<div>Cargando...</div>}>
            <FormView />
          </Suspense>,  
        },
    ]
  },
  {
    path: '/',
    element: <Navigate to="products/list" />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  },
]);

