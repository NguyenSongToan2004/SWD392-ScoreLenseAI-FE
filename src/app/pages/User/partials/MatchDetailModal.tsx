// // MatchDetailModal.tsx
// import { IoMdClose } from "react-icons/io";
// import { type BilliardMatch } from '../../../models/DataObject'; // Giả sử các interface được export từ file HistoryTable

// interface MatchDetailModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     match: BilliardMatch | null;
// }

// export default function MatchDetailModal({ isOpen, onClose, match }: MatchDetailModalProps) {
//     if (!isOpen || !match) {
//         return null;
//     }

//     // Hàm để định dạng thời gian
//     const formatTime = (timeString: string | null) => {
//         if (!timeString) return 'N/A';
//         return new Date(timeString).toLocaleTimeString('en-GB');
//     }

//     return (
//         // Lớp phủ nền (Backdrop)
//         <div className="fixed inset-0 z-60 flex justify-center items-center">
//             {/* Nội dung Modal */}
//             <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col opacity-100">
//                 {/* Header Modal */}
//                 <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-gray-50 rounded-t-lg">
//                     <h2 className="text-3xl font-bold" style={{ color: `var(--primary-color)` }}>
//                         Match Details: {match.code}
//                     </h2>
//                     <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-red-600 transition-transform duration-300 transform hover:rotate-90">
//                         <IoMdClose size={30} />
//                     </button>
//                 </div>

//                 {/* Body Modal có thể cuộn (Scroll View) */}
//                 <div className="p-6 overflow-y-auto">
//                     {/* Thông tin chung */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div className='bg-gray-100 p-4 rounded-lg'>
//                             <h3 className="text-2xl font-thin mb-2 text-gray-700">General Information</h3>
//                             <p><span className="mr-2 text-gray-600">Table:</span>{match.billiardTableID}</p>
//                             <p><span className="mr-2 text-gray-600">Start Time:</span>{new Date(match.startTime).toLocaleString('en-GB')}</p>
//                             <p><span className="mr-2 text-gray-600">End Time:</span>{match.endTime ? new Date(match.endTime).toLocaleString('en-GB') : 'N/A'}</p>
//                             <p><span className="mr-2 text-gray-600">Status:</span><span className="capitalize">{match.status}</span></p>
//                             <p><span className="mr-2 text-gray-600">Winner:</span><span className="text-green-600">{match.winner || 'N/A'}</span></p>
//                         </div>

//                         <div className='bg-gray-100 p-4 rounded-lg'>
//                             <h3 className="text-2xl font-thin mb-2 text-gray-700">Setup</h3>
//                             <p><span className="mr-2 text-gray-600">Mode ID:</span>{match.modeID}</p>
//                             <p><span className="mr-2 text-gray-600">Setup By:</span>{match.byStaff ? `Staff (${match.byStaff})` : `Customer (${match.byCustomer})`}</p>
//                             <p><span className="mr-2 text-gray-600">Total Sets:</span>{match.totalSet}</p>
//                         </div>
//                     </div>

//                     {/* Thông tin đội */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         {match.teams.map(team => (
//                             <div key={team.teamID} className={`p-4 rounded-lg border-2 ${team.status === 'win' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
//                                 {/* Tiêu đề tên đội vẫn được in đậm để làm nổi bật */}
//                                 <h3 className={`text-2xl font-bold mb-3 ${team.status === 'win' ? 'text-green-700' : 'text-red-700'}`}>{team.name} - {team.status.toUpperCase()}</h3>

//                                 {/* Bỏ strong ở đây */}
//                                 <p><span className="mr-2 text-gray-600">Total Score:</span>{team.totalScore}</p>

//                                 {team.players.map(player => (
//                                     <div key={player.playerID} className="mt-2 pl-4 border-l-2">
//                                         {/* Bỏ strong ở đây */}
//                                         <p><span className="mr-2 text-gray-600">Player:</span>{player.name}</p>
//                                         <p><span className="mr-2 text-gray-600">Score:</span>{player.totalScore}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Kết quả các set */}
//                     <div>
//                         {/* Giữ lại semi-bold cho tiêu đề này */}
//                         <h3 className="text-2xl font-semibold mb-2 text-gray-700">Set Results</h3>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full bg-white border">
//                                 <thead className="bg-gray-200">
//                                     <tr>
//                                         <th className="py-2 px-4 border-b font-normal"
//                                             style={{ color: `var(--primary-color)` }}
//                                         >Set No.</th>
//                                         <th className="py-2 px-4 border-b font-normal"
//                                             style={{ color: `var(--primary-color)` }}
//                                         >Winner</th>
//                                         <th className="py-2 px-4 border-b font-normal"
//                                             style={{ color: `var(--primary-color)` }}
//                                         >Start Time</th>
//                                         <th className="py-2 px-4 border-b font-normal"
//                                             style={{ color: `var(--primary-color)` }}
//                                         >End Time</th>
//                                         <th className="py-2 px-4 border-b font-normal"
//                                             style={{ color: `var(--primary-color)` }}
//                                         >Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {match.sets.map((set, index) => (
//                                         <tr key={set.gameSetID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                             <td className="py-2 px-4 border-b text-center">{set.gameSetNo}</td>
//                                             {/* Bỏ font-semibold ở đây */}
//                                             <td className="py-2 px-4 border-b text-center">{set.winner || 'N/A'}</td>
//                                             <td className="py-2 px-4 border-b text-center">{formatTime(set.startTime)}</td>
//                                             <td className="py-2 px-4 border-b text-center">{formatTime(set.endTime)}</td>
//                                             <td className="py-2 px-4 border-b text-center capitalize">{set.status}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { IoMdClose } from "react-icons/io";
// Đảm bảo bạn đã export các type này từ một file chung
import type { BilliardMatch } from '../../../models/DataObject';
import TableInfo from "./TableInfo";
import { ModeDisplayMap } from "../models/enum";

interface MatchDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: BilliardMatch | null;
}

export default function MatchDetailModal({ isOpen, onClose, match }: MatchDetailModalProps) {
    // Nếu modal không mở hoặc không có dữ liệu trận đấu, không render gì cả
    if (!isOpen || !match) {
        return null;
    }

    const modeForDisplay = (modeID: number): string => {
        return ModeDisplayMap[modeID] || "Unknown Mode";
    };

    // Hàm helper để định dạng thời gian (ví dụ: 14:30:55)
    const formatTime = (timeString: string | null) => {
        if (!timeString) return 'N/A';
        return new Date(timeString).toLocaleTimeString('en-GB');
    }

    return (
        // Lớp phủ nền (Backdrop) và container để căn giữa
        <div className="fixed inset-0 z-50 flex justify-center items-center p-3 font-sans">
            {/* Nội dung Modal */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg md:max-w-4xl max-h-[90vh] flex flex-col opacity-100">
                {/* Header Modal */}
                <div className="p-3 md:p-4 border-b flex justify-between items-center sticky top-0 bg-gray-50 rounded-t-lg flex-shrink-0">
                    <h2 className="text-xl md:text-3xl font-bold uppercase" style={{ color: `var(--primary-color)` }}>
                        Match Details: {match.code}
                    </h2>
                    <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-red-600 transition-transform duration-300 transform hover:rotate-90">
                        <IoMdClose size={28} />
                    </button>
                </div>

                {/* Body Modal có thể cuộn (Scroll View) */}
                <div className="p-3 md:p-6 overflow-y-auto">
                    {/* Thông tin chung & Setup */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className='bg-gray-100 p-3 rounded-lg text-sm md:text-base'>
                            <h3 className="text-lg md:text-2xl uppercase font-bold  mb-2 text-gray-700 ">
                                General Information
                            </h3>
                            <p><span className="mr-2 text-gray-600 font-semibold">Table:</span> <TableInfo tableID={match.billiardTableID} /></p>
                            <p><span className="mr-2 text-gray-600 font-semibold">Start Time:</span> {new Date(match.startTime).toLocaleString('vi-VN')}</p>
                            <p><span className="mr-2 text-gray-600 font-semibold">End Time:</span> {match.endTime ? new Date(match.endTime).toLocaleString('vi-VN') : 'N/A'}</p>
                            <p className="uppercase"><span className="mr-2 text-gray-600 font-semibold">Status:</span> {match.status}</p>
                            <p className="uppercase"><span className="mr-2 text-gray-600 font-semibold">Winner:</span> <span className="text-green-600">{match.winner || 'N/A'}</span></p>
                        </div>

                        <div className='bg-gray-100 p-3 rounded-lg text-sm md:text-base'>
                            <h3 className="text-lg md:text-2xl font-bold mb-2 text-gray-700 uppercase">Setup</h3>
                            <p><span className="mr-2 text-gray-600 font-semibold">Mode ID:</span> {modeForDisplay(match.modeID)}</p>
                            <p className="uppercase"><span className="mr-2 text-gray-600 font-semibold">Setup By:</span> {match.byStaff ? `Staff` : `Customer`}</p>
                            <p><span className="mr-2 text-gray-600 font-semibold">Total Sets:</span> {match.totalSet}</p>
                        </div>
                    </div>

                    {/* Thông tin đội */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {match.teams.map(team => (
                            <div key={team.teamID} className={`p-3 rounded-lg border-2 ${team.status === 'win' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} text-sm md:text-base`}>
                                <h3 className={`text-lg md:text-2xl font-bold mb-3 uppercase ${team.status === 'win' ? 'text-green-700' : 'text-red-700'}`}>{team.name} - {team.status}</h3>
                                <p><span className="mr-2 text-gray-600 font-semibold">Total Score:</span> {team.totalScore}</p>
                                <div className="mt-2 space-y-2">
                                    {team.players.map(player => (
                                        <div key={player.playerID} className="pl-4 border-l-2">
                                            <p className="uppercase"><span className="mr-2 text-gray-600 font-semibold">Player:</span> {player.name}</p>
                                            <p><span className="mr-2 text-gray-600 font-semibold">Score:</span> {player.totalScore}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Kết quả các set */}
                    <div>
                        <h3 className="text-lg md:text-2xl font-bold mb-2 text-gray-700 uppercase">Set Results</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border text-sm md:text-base">
                                <thead className="bg-gray-200 uppercase">
                                    <tr>
                                        <th className="py-2 px-4 border-b font-normal" style={{ color: `var(--primary-color)` }}>Set No.</th>
                                        <th className="py-2 px-4 border-b font-normal" style={{ color: `var(--primary-color)` }}>Winner</th>
                                        <th className="py-2 px-4 border-b font-normal" style={{ color: `var(--primary-color)` }}>Start Time</th>
                                        <th className="py-2 px-4 border-b font-normal" style={{ color: `var(--primary-color)` }}>End Time</th>
                                        <th className="py-2 px-4 border-b font-normal" style={{ color: `var(--primary-color)` }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {match.sets.map((set, index) => (
                                        <tr key={set.gameSetID} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="py-2 px-4 border-b">{set.gameSetNo}</td>
                                            <td className="py-2 px-4 border-b ">{set.winner || 'N/A'}</td>
                                            <td className="py-2 px-4 border-b">{formatTime(set.startTime)}</td>
                                            <td className="py-2 px-4 border-b">{formatTime(set.endTime)}</td>
                                            <td className="py-2 px-4 border-b ">{set.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}