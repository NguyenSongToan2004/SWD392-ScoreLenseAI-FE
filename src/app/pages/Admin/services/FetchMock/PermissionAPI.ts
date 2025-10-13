import type { Permission } from "../../models/ResponseObject";

// 🔹 Mock dữ liệu Permission (quyền)
const mockPermissions: Permission[] = [
  {
    name: "manage_users",
    description: "Allows user to create, edit, and delete other users within the system."
  },
  {
    name: "manage_roles",
    description: "Grants the ability to create and assign roles with specific permissions."
  },
  {
    name: "manage_permissions",
    description: "Allows modification of system-level permission definitions."
  },
  {
    name: "view_reports",
    description: "Allows viewing of analytical and activity reports."
  },
  {
    name: "manage_store",
    description: "Allows editing of store details, location, and business hours."
  },
  {
    name: "manage_staff",
    description: "Enables managing staff members and their assigned roles."
  },
  {
    name: "manage_tables",
    description: "Allows creating, updating, and disabling billiard tables."
  },
  {
    name: "view_customers",
    description: "Allows viewing customer list, bookings, and transaction history."
  },
  {
    name: "handle_transactions",
    description: "Allows processing and refunding payments."
  },
  {
    name: "view_dashboard",
    description: "Access to dashboard metrics and system overview."
  },
];

// 🔸 Giả lập độ trễ của API
function simulateDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Mock API: Lấy danh sách Permission
 */
export async function fetchPermissionAPI() {
  return simulateDelay({
    status: 200,
    data: mockPermissions,
    message: "Fetched mock permissions successfully.",
  });
}

/**
 * 🔴 (Tùy chọn) Mock API: Xóa Permission (nếu bạn bật lại nút Delete sau này)
 */
export async function deletePermissionAPI(name: string) {
  const index = mockPermissions.findIndex(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (index !== -1) {
    const deleted = mockPermissions.splice(index, 1)[0];
    return simulateDelay({
      status: 200,
      message: `Permission '${deleted.name}' deleted successfully.`,
    });
  }

  return simulateDelay({
    status: 404,
    message: `Permission '${name}' not found.`,
  });
}
