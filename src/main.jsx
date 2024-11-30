import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import CreateAccounts from './pages/CreateAccounts.jsx'
import Home from './pages/Home.jsx'

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/CrearCuenta',
    element:<CreateAccounts/>
  },
  {
    path:'/Inicio',
    element:<Home/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>  
  </StrictMode>,
)
