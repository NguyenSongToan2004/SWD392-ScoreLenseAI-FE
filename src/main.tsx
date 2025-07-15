import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './app/components/NotificationProvider.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const OAUTH_KEY = import.meta.env.VITE_GOOGLE_OAUTH_KEY

createRoot(document.getElementById('root')!).render(

  <GoogleOAuthProvider clientId={OAUTH_KEY}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </GoogleOAuthProvider>
)
