import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { NotificationProvider } from './app/components/NotificationProvider.tsx';
import './index.css';

const OAUTH_KEY = import.meta.env.VITE_GOOGLE_OAUTH_KEY

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={OAUTH_KEY}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </GoogleOAuthProvider>
)
