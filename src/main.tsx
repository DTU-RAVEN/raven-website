
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable JSON imports
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

// Define JSON module
declare module "*.json" {
  const content: any;
  export default content;
}

createRoot(document.getElementById("root")!).render(<App />);
