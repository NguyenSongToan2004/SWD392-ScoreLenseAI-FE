import type { Customer } from "../../../../models/DataObject";

// Mock dataset (fake customers)
let mockCustomers: Customer[] = [
  {
    customerID: 'CUS001',
    name: 'Nguyễn Văn Toàn',
    email: 'toan@example.com',
    phoneNumber: '0901234567',
    dob: '1999-08-12',
    address: 'Hà Nội',
    createAt: '2025-01-15',
    updateAt: '2025-03-01',
    type: 'vip',
    status: 'active',
    imageUrl: null,
  },
  {
    customerID: 'CUS002',
    name: 'Trần Thị Hằng',
    email: 'hang@example.com',
    phoneNumber: '0912345678',
    dob: '2000-02-05',
    address: 'TP. Hồ Chí Minh',
    createAt: '2025-02-01',
    updateAt: null,
    type: 'normal',
    status: 'inactive',
    imageUrl: 'https://randomuser.me/api/portraits/women/75.jpg',
  },
  {
    customerID: 'CUS003',
    name: 'Phạm Minh Anh',
    email: 'minhanh@example.com',
    phoneNumber: '0978889999',
    dob: '1997-10-20',
    address: 'Đà Nẵng',
    createAt: '2025-03-10',
    updateAt: null,
    type: 'normal',
    status: 'active',
    imageUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
  {
    customerID: 'CUS004',
    name: 'Lê Quốc Bảo',
    email: 'bao@example.com',
    phoneNumber: '0966668888',
    dob: '1995-05-11',
    address: 'Huế',
    createAt: '2025-04-02',
    updateAt: null,
    type: 'vip',
    status: 'active',
    imageUrl: null,
  },
];

// Utility: simulate network delay
function simulateDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

interface FetchParams {
  page: number;
  size: number;
  sortBy?: string;
  sortDirection?: string;
  search?: string;
  status?: string;
}

/**
 * Mock fetch customers
 */
export async function fetchCustomersAPI(params: FetchParams) {
  let filtered = [...mockCustomers];

  // 🔍 Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower) ||
        c.phoneNumber?.includes(searchLower)
    );
  }

  // 🟢 Status filter
  if (params.status) {
    filtered = filtered.filter((c) => c.status === params.status);
  }

  // ↕ Sort
  if (params.sortBy) {
    filtered.sort((a: any, b: any) => {
      const valA = a[params.sortBy as keyof Customer];
      const valB = b[params.sortBy as keyof Customer];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return params.sortDirection === 'desc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });
  }

  // 📄 Pagination
  const start = (params.page - 1) * params.size;
  const end = start + params.size;
  const pageData = filtered.slice(start, end);

  return simulateDelay({
    status: 200,
    data: {
      content: pageData,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / params.size),
      first: params.page === 1,
      last: end >= filtered.length,
      empty: filtered.length === 0,
    },
  });
}

/**
 * Mock update customer status
 */
export async function updateCustomerStatusAPI(customerID: string, newStatus: string) {
  const index = mockCustomers.findIndex((c) => c.customerID === customerID);
  if (index !== -1) {
    mockCustomers[index].status = newStatus;
    mockCustomers[index].updateAt = new Date().toISOString();
    return simulateDelay({ status: 200, message: 'Status updated', data: mockCustomers[index] });
  }
  return simulateDelay({ status: 404, message: 'Customer not found' });
}

/**
 * Mock delete customer
 */
export async function deleteCustomerAPI(customerID: string) {
  const index = mockCustomers.findIndex((c) => c.customerID === customerID);
  if (index !== -1) {
    mockCustomers.splice(index, 1);
    return simulateDelay({ status: 200, message: 'Customer deleted' });
  }
  return simulateDelay({ status: 404, message: 'Customer not found' });
}
