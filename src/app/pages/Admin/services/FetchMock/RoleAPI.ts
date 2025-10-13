import type { Role } from "../../../../models/DataObject";

// 🟢 Mock dataset (giả lập dữ liệu role)
let mockRoles: Role[] = [
  {
    name: "ADMIN",
    description: "Administrator with full access to all system features.",
    permissions: [
      { name: "manage_users", description: "Create, edit, and delete users" },
      { name: "manage_roles", description: "Create and manage user roles" },
      { name: "view_reports", description: "Access system-wide reports" },
      { name: "manage_settings", description: "Modify application settings" },
    ],
  },
  {
    name: "PROVIDER",
    description: "Service provider responsible for managing their own stores and staff.",
    permissions: [
      { name: "manage_stores", description: "Create and manage store data" },
      { name: "manage_staff", description: "Assign and edit staff roles" },
      { name: "view_analytics", description: "View store-level analytics" },
    ],
  },
  {
    name: "CUSTOMER",
    description: "Regular user who can view services and make bookings.",
    permissions: [
      { name: "browse_services", description: "View available services" },
      { name: "create_booking", description: "Book a service" },
      { name: "manage_profile", description: "Edit own profile information" },
    ],
  },
  {
    name: "STAFF",
    description: "Employee under a provider, limited access to assigned store operations.",
    permissions: [
      { name: "check_in", description: "Mark attendance and check-in customers" },
      { name: "update_table_status", description: "Change billiard table state" },
      { name: "view_tasks", description: "Access assigned daily tasks" },
    ],
  },
];

// 🔸 Mô phỏng delay
function simulateDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Mock API: Lấy danh sách Role
 */
export async function fetchRolesAPI() {
  return simulateDelay({
    status: 200,
    data: mockRoles,
    message: "Fetched mock roles successfully.",
  });
}

/**
 * 🔴 Mock API: Xoá Role theo tên
 */
export async function deleteRoleAPI(roleName: string) {
  const index = mockRoles.findIndex(
    (r) => r.name.toLowerCase() === roleName.toLowerCase()
  );

  if (index !== -1) {
    const deleted = mockRoles.splice(index, 1)[0];
    return simulateDelay({
      status: 200,
      message: `Role '${deleted.name}' deleted successfully.`,
    });
  }

  return simulateDelay({
    status: 404,
    message: `Role '${roleName}' not found.`,
  });
}
