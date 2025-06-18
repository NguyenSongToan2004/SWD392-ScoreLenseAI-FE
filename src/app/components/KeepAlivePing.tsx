import { useEffect } from "react";

export default function KeepAlivePing() {
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${apiUrl}/v1/ping`)
                .then((res) => {
                    if (!res.ok) throw new Error('Ping failed');
                    console.log('Pinged backend to keep alive');
                })
                .catch((err) => {
                    console.error('Error pinging backend:', err);
                });
        }, 60 * 1000); // mỗi 1 phút

        return () => clearInterval(interval);
    }, []);

    return null; // không hiển thị gì
}
