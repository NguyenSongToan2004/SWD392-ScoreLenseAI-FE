// import axios from "axios";

// const api = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}`,  // Cấu hình base URL
//     headers: { 'Content-Type': 'application/json' }, // Đặt header cho yêu cầu gửi đi là JSON
//     withCredentials: true,  // Đảm bảo cookie và thông tin xác thực sẽ được gửi
// });

// api.interceptors.response.use(
//     response => response,  // Chấp nhận phản hồi thành công
//     async error => {  // Xử lý lỗi
//         if (error.response?.status === 401 && !error.config._retry) {
//             error.config._retry = true;  // Tránh việc lặp lại vô hạn khi refresh

//             try {
//                 // Gọi API refresh token
//                 await api.post("/v2/auth/refresh");

//                 // Gọi lại request ban đầu với token mới
//                 return api(error.config);
//             } catch (refreshError) {
//                 console.log("Phiên đăng nhập đã hết hạn hoàn toàn.");
//                 window.location.href = "/login";  // Chuyển hướng đến trang login khi refresh thất bại
//             }
//         }

//         return Promise.reject(error);  // Trả về lỗi nếu không phải 401
//     }
// );

// export default api;

// src/lib/api.ts

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from 'sonner'; // <-- NHẬP KHẨU HÀM TOAST

// Các biến trạng thái vẫn giữ nguyên để xử lý concurrent requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void, reject: (reason?: any) => void }> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    // withCredentials là chìa khóa để trình duyệt tự động gửi httpOnly cookie
    withCredentials: true,
    headers: {
    
    }
});

api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Chỉ xử lý lỗi 401
        if (error.response?.status === 401 && originalRequest.url !== '/v2/auth/refresh') {

            if (isRefreshing) {
                // Nếu đang refresh, đẩy request vào hàng đợi
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // Khi có token mới (do request đầu tiên đã refresh thành công),
                        // chỉ cần gọi lại request. Trình duyệt sẽ tự động đính kèm cookie mới.
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Gọi API refresh token.
                // Chúng ta không cần nhận lại data vì token mới được set trong httpOnly cookie
                // thông qua header 'Set-Cookie' từ server.
                await api.post("/v2/auth/refresh");

                // Xử lý hàng đợi, báo cho các request khác rằng đã refresh thành công
                processQueue(null);

                // Thực hiện lại request gốc.
                return api(originalRequest);

            } catch (refreshError: any) {
                // Nếu refresh thất bại, hủy hàng đợi và đăng xuất
                processQueue(refreshError);

                console.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

                // Best practice: Gọi API logout để server xóa httpOnly cookie
                // await api.post('/v2/auth/logout'); 

                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as { message?: string };
            let conflictMessage = data?.message || "Xung đột dữ liệu đã xảy ra. Vui lòng thử lại.";
            switch (status) {
                case 403:
                    toast.error("Bạn không có quyền thực hiện hành động này.");
                    // notify("Bạn không có quyền thực hiện hành động này.", "error");
                    break;
                case 404:
                    toast.warning("Tài nguyên bạn yêu cầu không tồn tại.");
                    // notify("Trang này không tìm thấy", "error");
                    break;
                case 409:
                    toast.warning(conflictMessage);
                    break;
                case 500:
                    break;
                case 502:
                    break;
                case 503:
                    // notify("Hệ thống máy chủ đang gặp sự cố.", "error");
                    toast.warning("Hệ thống máy chủ đang gặp sự cố.")
                    break;
                default:
                    toast.warning(conflictMessage);
                    break;
            }
        } else if (error.request) {
            // notify("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng.", "error");
            toast("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng.");
        }

        return Promise.reject(error);
    }
);

export default api;
