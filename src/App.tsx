import { useEffect } from 'react';
import './App.css'
import MainRoutes from "./app/routes/MainRoutes"
import { stompClient, setupStompListeners } from './app/modules/Socket'; // Đường dẫn có thể cần điều chỉnh


function App() {

  useEffect(() => {
    console.log("App component mounted. Setting up and activating WebSocket client...");

    // Thiết lập các hàm lắng nghe
    setupStompListeners();

    // Kích hoạt kết nối
    // stompClient.activate();

    // Optional: Trả về một cleanup function để ngắt kết nối khi app unmount
    // (hữu ích cho hot-reloading trong môi trường dev)
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log("WebSocket client deactivated.");
      }
    };
  }, [])

  return (
    <MainRoutes />
  );
}

export default App
