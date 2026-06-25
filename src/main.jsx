import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n.jsx'
import App from './App.jsx'
import './styles.css'

// Mark that JS is running: reveal animations only hide content when this class is
// present, so if the script fails to load the content stays fully visible.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
