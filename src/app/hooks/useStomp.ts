// src/app/hooks/useStomp.ts (Tạo một thư mục hooks mới)

import { useRef, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const STOMP_ENDPOINT = import.meta.env.VITE_STOMP_ENDPOINT;

export const useStomp = () => {
    // Sử dụng useRef để lưu trữ instance của client.
    // useRef sẽ giữ giá trị của nó qua các lần re-render mà không trigger re-render.
    const clientRef = useRef<Client | null>(null);

    // State để theo dõi trạng thái kết nối, giúp component biết khi nào có thể subscribe/publish.
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Chỉ chạy một lần khi component mount
        const token = localStorage.getItem("accessToken"); // 🔑 Lấy JWT token từ localStorage
        console.log(token);
        // 1. Tạo instance của Stomp Client 
        const stompClient = new Client({
            webSocketFactory: () => new SockJS(STOMP_ENDPOINT),
            connectHeaders : {
                Authorization: token ? `Bearer ${token}` : "",
            },
            debug: (str) => {
                console.log(`STOMP DEBUG: ${str}`);
            },
            onConnect: () => {
                console.log('%c--- STOMP CONNECTION ESTABLISHED ---', 'color: green; font-weight: bold;');
                setIsConnected(true); // Cập nhật trạng thái đã kết nối
            },
            onDisconnect: () => {
                console.log('%c--- STOMP CONNECTION CLOSED ---', 'color: red; font-weight: bold;');
                setIsConnected(false); // Cập nhật trạng thái đã ngắt kết nối
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        // 2. Lưu instance vào ref để có thể truy cập từ bên ngoài useEffect
        clientRef.current = stompClient;

        // 3. Kích hoạt kết nối
        stompClient.activate();

        // 4. Quan trọng: Hàm dọn dẹp (cleanup function)
        // Sẽ được gọi khi component unmount
        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần duy nhất

    // Trả về client instance và trạng thái kết nối cho component sử dụng
    return { client: clientRef.current, isConnected };
};