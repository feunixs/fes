import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Import styles directly to control the order
import './styles/main.css'
import './styles/animations.css'
import './styles/parallax.css'
import './styles/login.css'
import './styles/custom.css'
import './styles/global.css'

// Import tailwind directives separately
import './styles/tailwind.css'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(<App />);
