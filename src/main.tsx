
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

// Define JSON module without the dot-star pattern
declare module "*.json" {
  const value: any;
  export default value;
}

createRoot(document.getElementById("root")!).render(<App />);
