import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/config';
import type { TableOperationRequest } from '../app/models/DataObject';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestNotificationPermission = async () => {
  try {
    console.log('Current permission:', Notification.permission);
    
    if (Notification.permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token:', token);
      localStorage.setItem('fcmToken', token);
      return token;
    }
    
    if (Notification.permission === 'denied') {
      console.log('Notification permission denied');
      return null;
    }
    
    const permission = await Notification.requestPermission();
    console.log('New permission:', permission);
    
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token:', token);
      localStorage.setItem('fcmToken', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Sửa lại để trả về unsubscribe function
export const onMessageListener = (callback: (payload: any) => void) => {
  return onMessage(messaging, callback);
};

const API_URL = import.meta.env.VITE_API_URL;

// Gửi token lên server
export const sendTokenToServer = async (form: TableOperationRequest) => {
  try {
    const response = await fetch(`${API_URL}/v3/fcm/operation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending token to server:', error);
    return false;
  }
};


