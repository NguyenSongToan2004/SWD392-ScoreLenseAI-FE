// src/contexts/NotificationContext.tsx

import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

// Cấu trúc của một thông báo
interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

// Nội dung của Context
interface NotificationContextType {
    addNotification: (message: string, type: Notification['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((message: string, type: Notification['type']) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);

        // Tự động xóa thông báo sau 5 giây
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    // LẮNG NGHE SỰ KIỆN TỪ AXIOS INTERCEPTOR
    useEffect(() => {
        const handleShowNotification = (event: Event) => {
            const customEvent = event as CustomEvent<{ message: string; type: Notification['type'] }>;
            addNotification(customEvent.detail.message, customEvent.detail.type);
        };

        window.addEventListener('show-notification', handleShowNotification);

        return () => {
            window.removeEventListener('show-notification', handleShowNotification);
        };
    }, [addNotification]);


    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            {/* Component để hiển thị các thông báo */}
            <div className="notification-container">
                {notifications.map(n => (
                    <div key={n.id} className={`notification ${n.type}`}>
                        {n.message}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

// Custom hook để dễ dàng sử dụng trong các component React
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};