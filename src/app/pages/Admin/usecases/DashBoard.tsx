// src/pages/admin/DashBoard.tsx

import fillTrophyIcon from "../../../assets/AiFillTrophy.svg";
import availableTableIcon from "../../../assets/AvaiTable.svg";
import brokenIcon from "../../../assets/Broken.svg";
import currentPlayIcon from "../../../assets/CurrentPlayIcon.svg";
import medalIcon from "../../../assets/FaMedal.svg";
import tableIcon from "../../../assets/TableIcon.svg";
import StatCard from "../partials/StatCard";

// --- DỮ LIỆU GIẢ ---
const statsData = [
  { title: 'TOTAL TABLES', value: 20, icon: tableIcon, color: 'orange' },
  { title: 'CURRENTLY PLAYING', value: 5, icon: currentPlayIcon, color: 'green' },
  { title: 'AVAILABLE TABLES', value: 13, icon: availableTableIcon, color: 'blue' },
  { title: 'BROKEN', value: 2, icon: brokenIcon, color: 'red' },
];

const topCustomersData = [
  { rank: 1, name: 'ANDREW', matches: 300 },
  { rank: 2, name: 'THONG LE', matches: 300 },
  { rank: 3, name: 'SONG TOAN', matches: 300 },
  { rank: 4, name: 'CODE FOR RICE', matches: 300 },
  { rank: 5, name: 'MINH DINH', matches: 300 },
  { rank: 6, name: 'VY NGUYEN', matches: 300 },
  { rank: 7, name: 'KA', matches: 300 },
  { rank: 8, name: 'MY', matches: 300 },
  { rank: 9, name: 'VINH', matches: 300 },
];

// --- COMPONENT CHÍNH ---
// Phần này của bạn đã đúng hoàn toàn, không cần sửa.
const DashBoard = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Phần Thống Kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon} // `stat.icon` bây giờ là một string (URL)
            color={stat.color as any}
          />
        ))}
      </div>

      {/* Phần Bảng Xếp Hạng Khách Hàng */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={fillTrophyIcon} alt="Trophy Icon" className='w-12 h-12' />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">TOP CUSTOMER</h2>
        </div>

        <div className="space-y-3">
          {topCustomersData.map((customer) => (
            <div key={customer.rank} className="flex justify-between items-center p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
              <div className="flex items-center">
                <span className="font-bold text-lg text-gray-500 mr-4">#{customer.rank}</span>
                {/* Bạn đã làm đúng ở đây */}
                <img src={medalIcon} alt="Medal Icon" className='w-5 h-5 mr-3' />
                <span className="font-semibold text-gray-700">{customer.name}</span>
              </div>
              <div className="text-sm font-medium text-gray-500">
                {customer.matches} MATCHES
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;