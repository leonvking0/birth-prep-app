import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx'
import { StudyProvider } from './providers/StudyProvider.jsx'
import { registerServiceWorker } from './lib/pwa/registerServiceWorker.js'

if (import.meta.env.PROD) {
  registerServiceWorker()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <StudyProvider>
          <App />
        </StudyProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
