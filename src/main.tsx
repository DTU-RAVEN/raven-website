
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable JSON imports
declare module "*.json" {
  const value: any;
  export default value;
}

createRoot(document.getElementById("root")!).render(<App />);
