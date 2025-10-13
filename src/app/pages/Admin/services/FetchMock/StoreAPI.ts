import type { Store, BilliardTable } from "../../models/ResponseObject";

// 🟢 Mock dataset
let mockStores: Store[] = [
  {
    storeID: "STORE001",
    name: "King Pool Center",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    status: "activate",
    description: "Luxury billiard club with professional 9ft tables and VIP rooms.",
    billiardTables: [
      {
        billardTableID: "TBL001",
        tableCode: "01",
        tableType: "9ft Pool",
        name: "Diamond Pro 9ft",
        description: "Professional 9ft pool table with Simonis 860 cloth.",
        status: "available",
        qrCode: "https://example.com/qrcode/TBL001",
        cameraUrl: "https://camera.kingpool.vn/tbl001",
        active: true,
      },
      {
        billardTableID: "TBL002",
        tableCode: "02",
        tableType: "10ft Carom",
        name: "Brunswick Gold Crown",
        description: "Carom 3C table used for tournaments.",
        status: "inUse",
        qrCode: "https://example.com/qrcode/TBL002",
        cameraUrl: "https://camera.kingpool.vn/tbl002",
        active: true,
      },
    ],
  },
  {
    storeID: "STORE002",
    name: "Downtown Billiards",
    address: "45 Lê Lợi, Đà Nẵng",
    status: "closed",
    description: "Mid-size billiard club focusing on 8ft tables and casual play.",
    billiardTables: [
      {
        billardTableID: "TBL003",
        tableCode: "03",
        tableType: "8ft Pool",
        name: "Rasson Victory II Plus",
        description: "Durable table for recreational players.",
        status: "underMaintainance",
        qrCode: "https://example.com/qrcode/TBL003",
        cameraUrl: "https://camera.downtown.vn/tbl003",
        active: false,
      },
      {
        billardTableID: "TBL004",
        tableCode: "04",
        tableType: "Carom 3C",
        name: "Gabriels Imperator",
        description: "Heated carom table for advanced players.",
        status: "available",
        qrCode: "https://example.com/qrcode/TBL004",
        cameraUrl: "https://camera.downtown.vn/tbl004",
        active: true,
      },
    ],
  },
  {
    storeID: "STORE003",
    name: "Royal Cue Lounge",
    address: "89 Hai Bà Trưng, Hà Nội",
    status: "activate",
    description: "Premium billiard club with lounge area and high-end equipment.",
    billiardTables: [
      {
        billardTableID: "TBL005",
        tableCode: "05",
        tableType: "9ft Pool",
        name: "Riley Aristocrat",
        description: "Imported from UK, leather pockets, oak finish.",
        status: "available",
        qrCode: "https://example.com/qrcode/TBL005",
        cameraUrl: "https://camera.royalcue.vn/tbl005",
        active: true,
      },
    ],
  },
];

// 🔸 Mô phỏng delay
function simulateDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Mock API: Lấy danh sách cửa hàng
 */
export async function fetchStoreAPI() {
  return simulateDelay({
    status: 200,
    data: mockStores,
    message: "Fetched mock stores successfully.",
  });
}

/**
 * 🟡 Mock API: Cập nhật trạng thái cửa hàng (activate/closed)
 */
export async function updateStoreStatusAPI(storeID: string, newStatus: "activate" | "closed") {
  const store = mockStores.find((s) => s.storeID === storeID);
  if (store) {
    store.status = newStatus;
    return simulateDelay({
      status: 200,
      message: `Store ${store.name} is now ${newStatus === "activate" ? "activated" : "closed"}.`,
      data: store,
    });
  }

  return simulateDelay({
    status: 404,
    message: "Store not found.",
  });
}
