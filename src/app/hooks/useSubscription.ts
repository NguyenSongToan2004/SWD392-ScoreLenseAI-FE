// src/app/hooks/useSubscription.ts

import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

type MessageCallback = (message: any) => void;

export const useSubscription = (
    client: Client | null,
    isConnected: boolean,
    destination: string,
    callback: MessageCallback
) => {
    useEffect(() => {
        // Chỉ thực hiện subscribe khi:
        // 1. Đã có instance của client
        // 2. Client đã kết nối thành công
        if (client && isConnected) {
            console.log(`%cSubscribing to ${destination}`, 'color: blue');

            const subscription = client.subscribe(destination, (message) => {
                try {
                    const parsedData = JSON.parse(message.body);
                    callback(parsedData);
                } catch (e) {
                    // Nếu message không phải JSON, trả về nguyên bản
                    callback(message.body);
                }
            });

            // Hàm dọn dẹp: tự động unsubscribe khi component unmount
            // hoặc khi destination/callback thay đổi
            return () => {
                console.log(`%cUnsubscribing from ${destination}`, 'color: orange');
                subscription.unsubscribe();
            };
        }
    }, [client, isConnected, destination, callback]); // Phụ thuộc vào các giá trị này
};