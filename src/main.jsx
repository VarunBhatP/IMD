import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
