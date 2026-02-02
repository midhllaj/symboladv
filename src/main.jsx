import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ModalProvider } from './context/ModalContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </HelmetProvider>
  </StrictMode>,
)

