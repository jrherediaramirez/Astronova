import './index.css';
import App from './App'; // Assuming you'll create an App.jsx for routing
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './auth/AuthContext'; // Adjust path as needed

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);