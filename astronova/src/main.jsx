import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './auth/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);