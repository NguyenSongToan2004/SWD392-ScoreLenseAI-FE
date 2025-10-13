import type { BilliardTable } from "../../../Home/models/DataObject";

// 🔹 Mock dữ liệu bàn billiard (giả lập như từ backend)
let mockTables: BilliardTable[] = [
  {
    billardTableID: "TBL001",
    tableCode: "01",
    name: "Diamond Pro 9ft",
    tableType: "9ft Pool",
    description: "Professional 9ft pool table with Simonis cloth.",
    status: "available",
    storeName: "King Pool Center",
    active: true,
  },
  {
    billardTableID: "TBL002",
    tableCode: "02",
    name: "Brunswick Gold Crown",
    tableType: "10ft Carom",
    description: "Carom table used for tournaments, heated slate surface.",
    status: "underMaintainance",
    storeName: "King Pool Center",
    active: false,
  },
  {
    billardTableID: "TBL003",
    tableCode: "03",
    name: "Rasson Victory II Plus",
    tableType: "8ft Pool",
    description: "Mid-size table suitable for clubs and practice rooms.",
    status: "inUse",
    storeName: "Downtown Billiards",
    active: true,
  },
  {
    billardTableID: "TBL004",
    tableCode: "04",
    name: "Gabriels Imperator",
    tableType: "Carom 3C",
    description: "Premium heated carom table for advanced players.",
    status: "available",
    storeName: "Downtown Billiards",
    active: true,
  },
];

// 🔸 Mô phỏng độ trễ khi fetch dữ liệu
function simulateDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Giả lập API lấy danh sách bàn billiard
 * @param storeName tên cửa hàng (giống như storeId ở bản thật)
 */
export async function fetchTablesAPI(storeName: string) {
  const filtered = mockTables.filter(
    (t) => t.storeName.toLowerCase() === storeName.toLowerCase()
  );

  return simulateDelay({
    status: 200,
    data: filtered,
    message: "Fetched mock billiard tables successfully.",
  });
}

/**
 * 🔴 Giả lập API xoá bàn billiard
 * @param billardTableID mã bàn cần xoá
 */
export async function deleteTablesAPI(billardTableID: string) {
  const index = mockTables.findIndex((t) => t.billardTableID === billardTableID);

  if (index !== -1) {
    const deleted = mockTables.splice(index, 1)[0];
    return simulateDelay({
      status: 200,
      message: `Deleted table ${deleted.name} successfully.`,
    });
  }

  return simulateDelay({
    status: 404,
    message: "Table not found.",
  });
}
