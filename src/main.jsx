import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Routes/Routes.jsx'
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top right '></Toaster>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
