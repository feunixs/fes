import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/ui/enhanced-styles.css'
import './components/ui/animations.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(<App />);
