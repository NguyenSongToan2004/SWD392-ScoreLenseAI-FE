// src/app/modules/Sockets.ts

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Tạo và export instance của Stomp Client
export const stompClient = new Client({
    webSocketFactory: () => {
        return new SockJS('http://localhost:8080/ws');
    },
    debug: (str) => {
        console.log(`STOMP DEBUG: ${str}`);
    },
    // reconnectDelay: 5000,
});

// Định nghĩa một hàm để thiết lập các listener, 
// component sẽ gọi hàm này và truyền vào các hàm callback của nó
export const setupStompListeners = () => {
    stompClient.onConnect = (frame) => {
        console.log('%c--- CONNECTION ESTABLISHED ---', 'color: green; font-weight: bold;', frame);

        stompClient.subscribe('/topic/notification', (message) => {
            console.log('%c[NOTIFICATION RECEIVED]', 'color: blue;', message.body);
        });

        stompClient.subscribe('/topic/logging_notification', (message) => {
            console.log('%c[LOGGING RECEIVED]', 'color: orange;', message.body);
        });

        stompClient.subscribe('/topic/shot_event', (message) => {
            const data = JSON.parse(message.body);
            console.log('%c[SHOT EVENT RECEIVED]', 'color: purple;', data);
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };
};

// KHÔNG GỌI .activate() ở đây nữa