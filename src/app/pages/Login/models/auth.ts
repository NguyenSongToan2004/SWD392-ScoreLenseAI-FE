export interface LoginFormData {
  username: string;
  password: string;
  // remember?: boolean;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  customerID: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  dob: string; // Nếu muốn dùng Date thì cần chuyển đổi định dạng
  createAt: string;
  updateAt: string | null;
  type: 'normal' | 'vip' | string; // thêm các loại khác nếu có
  status: 'active' | 'inactive' | string; // thêm các trạng thái khác nếu có
}