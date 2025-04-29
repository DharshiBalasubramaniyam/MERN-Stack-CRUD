import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId={window.__RUNTIME_CONFIG__?.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
      <Toaster />
    </GoogleOAuthProvider>
  // </React.StrictMode>
)
