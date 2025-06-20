import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,  // Cấu hình base URL
    headers: { 'Content-Type': 'application/json' }, // Đặt header cho yêu cầu gửi đi là JSON
    withCredentials: true,  // Đảm bảo cookie và thông tin xác thực sẽ được gửi
});

api.interceptors.response.use(
    response => response,  // Chấp nhận phản hồi thành công
    async error => {  // Xử lý lỗi
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;  // Tránh việc lặp lại vô hạn khi refresh
            
            try {
                // Gọi API refresh token
                await api.post("/v2/auth/refresh");
                
                // Gọi lại request ban đầu với token mới
                return api(error.config);
            } catch (refreshError) {
                console.log("Phiên đăng nhập đã hết hạn hoàn toàn.");
                window.location.href = "/login";  // Chuyển hướng đến trang login khi refresh thất bại
            }
        }
        
        return Promise.reject(error);  // Trả về lỗi nếu không phải 401
    }
);

export default api;
