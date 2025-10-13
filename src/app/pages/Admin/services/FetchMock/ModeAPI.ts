import type { Mode } from "../../../Home/models/DataObject";

// 🟢 Mock dataset (giả lập danh sách các mode)
let mockModes: Mode[] = [
  {
    modeID: 1,
    name: "Casual",
    description: "Relaxed mode for casual players, no time limit or scoring pressure.",
    active: true,
  },
  {
    modeID: 2,
    name: "Competitive",
    description: "Standard mode with ranking and time constraints for advanced players.",
    active: true,
  },
  {
    modeID: 3,
    name: "Training",
    description: "Practice mode to improve your skills. Includes shot guides and replay support.",
    active: true,
  },
  {
    modeID: 4,
    name: "Tournament",
    description: "Tournament mode for official events and competitions.",
    active: false,
  },
  {
    modeID: 5,
    name: "Private Room",
    description: "Invite-only sessions for private play or events.",
    active: true,
  },
];

// 🔸 Hàm giả lập độ trễ API (như thật)
function simulateDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Mock API: Lấy danh sách Mode
 */
export async function fetchModesAPI() {
  return simulateDelay({
    status: 200,
    data: mockModes,
    message: "Fetched mock modes successfully.",
  });
}

/**
 * 🔴 Mock API: Xóa Mode theo ID
 */
export async function deleteModeAPI(modeID: number) {
  const index = mockModes.findIndex((m) => m.modeID === modeID);

  if (index !== -1) {
    const deleted = mockModes.splice(index, 1)[0];
    return simulateDelay({
      status: 200,
      message: `Mode '${deleted.name}' deleted successfully.`,
    });
  }

  return simulateDelay({
    status: 404,
    message: `Mode with ID ${modeID} not found.`,
  });
}
