
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

// This allows importing JSON files
declare module "*.json" {
  const content: Record<string, any>;
  export default content;
}

createRoot(document.getElementById("root")!).render(<App />);
