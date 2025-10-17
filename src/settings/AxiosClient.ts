import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from 'sonner';

// State variables to handle concurrent requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void, reject: (reason?: any) => void }> = [];
let IDENTITY_BASE_PATH = import.meta.env.VITE_IDENTITY_BASE_PATH;

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
    withCredentials : true,
});

api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Only handle 401 errors
        if (error.response?.status === 401 && originalRequest.url !== `${IDENTITY_BASE_PATH}/api/refesh-token`) {

            if (isRefreshing) {
                // If refreshing, push request to queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // When new token is available (first request successfully refreshed),
                        // just retry the request. Browser will automatically attach new cookie.
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token API.
                // We don't need to receive data because new token is set in httpOnly cookie
                // through 'Set-Cookie' header from server.
                await api.post("/auth/refresh");

                processQueue(null);

                return api(originalRequest);

            } catch (refreshError: any) {
                // If refresh fails, cancel queue and logout
                processQueue(refreshError);

                console.error("Session has expired. Please login again.");

                // Best practice: Call logout API to clear httpOnly cookie on server
                await api.post('/v2/auth/logout');

                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as { message?: string };
            let conflictMessage = data?.message || "Data conflict occurred. Please try again.";
            switch (status) {
                case 403:
                    toast.error("You don't have permission to perform this action.");
                    break;
                case 404:
                    toast.warning("The resource you requested does not exist.");
                    break;
                case 409:
                    toast.warning(conflictMessage);
                    break;
                case 429:
                    toast.warning("The server is overloading ! Please try again in few minutes");
                    break;
                case 500:
                    toast.warning("Has something wrong in server ! Please try again in few minutes")
                    break;
                case 502:
                    toast.warning("The gateway has an error ! Please try again in few minutes")
                    break;
                case 503:
                    toast.warning("Server system is experiencing issues.");
                    break;
                default:
                    toast.warning(conflictMessage);
                    break;
            }
        } else if (error.request) {
            toast("Unable to connect to server. Please check your network connection.");
        }

        return Promise.reject(error);
    }
);

export default api;


// import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
// import { toast } from "sonner";

// // ================================
// // ⚙️ State quản lý refresh token
// // ================================
// let isRefreshing = false;
// let failedQueue: Array<{ resolve: (token: string) => void; reject: (reason?: any) => void }> = [];

// const processQueue = (error: AxiosError | null, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token!);
//     }
//   });
//   failedQueue = [];
// };

// // ================================
// // 🌐 Cấu hình axios instance
// // ================================
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // ================================
// // 🔐 Interceptor thêm token trước mỗi request
// // ================================
// api.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("access_token");
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// // ================================
// // 🧠 Interceptor xử lý lỗi response (401, 403, v.v.)
// // ================================
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//     // Chỉ xử lý 401
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Nếu đang refresh → đợi token mới rồi retry
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token: string) => {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//               resolve(api(originalRequest));
//             },
//             reject,
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refresh_token");
//         if (!refreshToken) {
//           throw new Error("No refresh token found");
//         }

//         // Gọi API refresh token (ví dụ endpoint của bạn)
//         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/identity/api/refresh`, {
//           refresh_token: refreshToken,
//         });

//         const newAccessToken = data?.access_token;
//         const newRefreshToken = data?.refresh_token;

//         if (newAccessToken) {
//           localStorage.setItem("access_token", newAccessToken);
//           if (newRefreshToken) localStorage.setItem("refresh_token", newRefreshToken);

//           api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//           processQueue(null, newAccessToken);

//           // Retry lại request gốc
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         } else {
//           throw new Error("No access token returned from refresh endpoint");
//         }
//       } catch (refreshError: any) {
//         processQueue(refreshError, null);
//         toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
//         localStorage.clear();
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // ================================
//     // ⚠️ Các lỗi còn lại
//     // ================================
//     if (error.response) {
//       const { status, data } = error.response as { status: number; data?: any };
//       const message = data?.message || "Đã có lỗi xảy ra.";

//       switch (status) {
//         case 403:
//           toast.error("Bạn không có quyền thực hiện hành động này.");
//           break;
//         case 404:
//           toast.warning("Không tìm thấy tài nguyên được yêu cầu.");
//           break;
//         case 409:
//           toast.warning(message || "Xung đột dữ liệu. Vui lòng thử lại.");
//           break;
//         case 429:
//           toast.warning("Máy chủ đang quá tải. Vui lòng thử lại sau.");
//           break;
//         case 500:
//           toast.error("Lỗi máy chủ nội bộ. Vui lòng thử lại sau.");
//           break;
//         case 502:
//           toast.error("Gateway gặp lỗi khi kết nối đến dịch vụ.");
//           break;
//         case 503:
//           toast.error("Hệ thống đang tạm ngưng. Vui lòng thử lại sau.");
//           break;
//         default:
//           toast.warning(message);
//       }
//     } else if (error.request) {
//       toast("Không thể kết nối đến máy chủ. Kiểm tra mạng của bạn.");
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

