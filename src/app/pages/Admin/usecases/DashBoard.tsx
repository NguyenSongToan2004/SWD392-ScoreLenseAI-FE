// src/pages/admin/DashBoard.tsx

import { useEffect, useState } from "react";
import fillTrophyIcon from "../../../assets/AiFillTrophy.svg";
import availableTableIcon from "../../../assets/AvaiTable.svg";
import brokenIcon from "../../../assets/Broken.svg";
import currentPlayIcon from "../../../assets/CurrentPlayIcon.svg";
import medalIcon from "../../../assets/FaMedal.svg";
import tableIcon from "../../../assets/TableIcon.svg";
import StatCard from "../partials/StatCard";
import { fetchStatisticAPI } from "../services/FetchAPI";
import { toast } from "sonner";
import type { BilliardStats } from "../models/ResponseObject";

const DashBoard = () => {

  const [data, setData] = useState<BilliardStats | null>();

  useEffect(() => {

    const fetchStatistic = async () => {
      const storeId = localStorage.getItem("storeID");
      const response = await fetchStatisticAPI({
        queryType: 'storeData',
        storeId: storeId || '',
        page: 1,
        size: 10,
        sortBy: 'customerName',
        sortDirection: 'asc'
      });
      if (response.status === 200) {
        setData(response.data);
        console.log(response.data);
      } else {
        toast.error(response.message || 'Failed to fetch statistic data.');
      }
    }

    fetchStatistic();
  }, [])

  return (
    <>
      {
        data != null ?
          <div className="flex flex-col gap-4">
            {/* Phần Thống Kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <StatCard
                title={"TOTAL TABLES"}
                value={data.totalTables}
                icon={tableIcon} // `stat.icon` bây giờ là một string (URL)
                color={'orange'}
              />

              <StatCard
                title={"CURRENTLY PLAYING"}
                value={data.currentlyPlaying}
                icon={currentPlayIcon} // `stat.icon` bây giờ là một string (URL)
                color={'green'}
              />
              <StatCard
                title={"AVAILABLE TABLES"}
                value={data.availableTables}
                icon={availableTableIcon} // `stat.icon` bây giờ là một string (URL)
                color={'blue'}
              />
              <StatCard
                title={"BROKEN TABLES"}
                value={data.brokenTables}
                icon={brokenIcon} // `stat.icon` bây giờ là một string (URL)
                color={'red'}
              />

            </div>

            {/* Phần Bảng Xếp Hạng Khách Hàng */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col items-center mb-6">
                <img src={fillTrophyIcon} alt="Trophy Icon" className='w-12 h-12' />
                <h2 className="text-2xl font-bold text-gray-800 mt-2">TOP CUSTOMER</h2>
              </div>

              <div className="space-y-3">
                {
                  data.customers.length != 0 ?
                    data.customers.map((customer, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                        <div className="flex items-center">
                          <span className="font-bold text-lg text-gray-500 mr-4">#{index + 1}</span>
                          {/* Bạn đã làm đúng ở đây */}
                          <img src={medalIcon} alt="Medal Icon" className='w-5 h-5 mr-3' />
                          <span className="font-semibold text-gray-700">{customer.customerName}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {customer.matchCount} MATCHES
                        </div>
                      </div>
                    ))
                    :
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-lg text-gray-500">No customer data to display.</p>
                    </div>
                }
              </div>
            </div>
          </div>
          :
          <div>
            loading....
          </div>
      }
    </>
  );
};

export default DashBoard;
