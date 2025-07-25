import { useEffect } from 'react';
import './App.css';
import { useNotification } from './app/components/NotificationProvider';
import MainRoutes from "./app/routes/MainRoutes";
import { onMessageListener } from './services/fcmService';
import { setupStompListeners, stompClient } from './app/modules/Socket';

function App() {
  const { addNotification } = useNotification();

  useEffect(() => {
    console.log("App component mounted. Setting up and activating WebSocket client...");
    setupStompListeners();
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log("WebSocket client deactivated.");
      }
    };
  }, [])

  useEffect(() => {
    // Listen for foreground messages
    const unsubscribe = onMessageListener((payload: any) => {
      console.log('Foreground message:', payload);
      // toast.info(response.notification.body);
      addNotification(
        payload.notification?.body || 'New notification',
        'info'
      );
    });

    // Cleanup function 
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [addNotification]);

  return (
    <MainRoutes />
  );
}

export default App
