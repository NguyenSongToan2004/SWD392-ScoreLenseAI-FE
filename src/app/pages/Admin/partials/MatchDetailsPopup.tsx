// src/pages/admin/partials/MatchDetailsPopup.tsx
import React, { useEffect } from 'react';
import playingIcon from "../../../assets/playingIcon.svg";
import type { BilliardMatch } from '../../../models/DataObject';
import { formatTime } from '../../../Utils/formatters';
import Duration from './Duration';
import { useNavigate } from 'react-router-dom';
import nextIcon from "../../../assets/GrNext.svg"; 

interface MatchDetailsPopupProps {
    tableID: string
    tableCode: string;
    onClose: () => void;
    status: 'inUse' | 'available' | 'underMaintainance';
    match: BilliardMatch | null
}

// Helper để map modeID sang tên chế độ chơi
const getGameModeName = (modeId: number): string => {
    const modeMap: Record<number, string> = {
        1: '8-BALL',
        2: '9-BALL',
        3: 'ONE-CUSHION CAROOM',
        4: 'THREE-CUSHION CAROOM'
    };
    return modeMap[modeId] || 'CUSTOM';
};



export const MatchDetailsPopup: React.FC<MatchDetailsPopupProps> = ({ tableID, tableCode, onClose, status, match }) => {
    const nav = useNavigate();
    const handleCreate = () => {
        nav(`/${tableID}`);
    }

    // Hiệu ứng khi nhấn phím 'Escape' để đóng popup
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const renderContent = () => {

        if (status === "available") {
            return (
                <div className="flex justify-center p-6">
                    <button
                        className="text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={handleCreate}
                        // Sử dụng màu nền giống các nút chính khác
                        style={{ backgroundColor: `var(--primary-color)` }}
                    >
                        <h5 className="text-base md:text-lg font-semibold">Create Match</h5>
                        <img src={nextIcon} alt="Create Match" className="w-5 h-5" />
                    </button>
                </div>
            )
        }

        if (status === "underMaintainance") {
            return <div className="text-center p-8 text-red-500">This table is under maintainance !!</div>;
        }

        if (!match) {
            return <div className="text-center p-8 text-red-500">Could not load match details.</div>;
        }

        // === ĐÃ SỬA LỖI CÚ PHÁP TẠI ĐÂY ===
        const teamA = match.teams.find(team => team.name === "TEAM A");
        const teamB = match.teams.find(team => team.name === "TEAM B");

        return (
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl font-bold text-gray-700">{tableCode}</div>
                    {match.status === 'ongoing' && (
                        <div className="flex items-center bg-green-100 text-green-700 font-bold py-1 px-3 rounded-full">
                            <img src={playingIcon} alt="Playing Icon" className='w-3 h-auto mr-2' />
                            PLAYING
                        </div>
                    )}
                </div>

                {/* Teams Info */}
                <div className="space-y-3 mb-6">
                    <div>
                        <p className="font-semibold text-gray-500 mb-1">TEAM A:</p>

                        <div className="bg-gray-100 rounded-md p-2 text-gray-800">
                            {teamA?.players.map(p => (
                                <li key={p.playerID}>{p.name}</li>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500 mb-1">TEAM B:</p>
                        <div className="bg-gray-100 rounded-md p-2 text-gray-800">
                            {teamB?.players.map(p => (
                                <li key={p.playerID}>{p.name}</li>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Game Details */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-right">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">GAME MODE:</span>
                        <span className="font-bold text-blue-600">{getGameModeName(match.modeID)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">START AT:</span>
                        <span className="font-bold text-blue-600">{formatTime(match.startTime)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">DURATION:</span>
                        <Duration
                            status={match.status}
                            startTime={match.startTime}
                            endTime={match.endTime}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        // Overlay
        <div
            className="fixed inset-0 flex justify-center items-center z-500"
            onClick={onClose}
        >
            {/* Popup Card */}
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4 opacity-100"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Card */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">DETAILS</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl cursor-pointer">&times;</button>
                </div>
                {/* Content Card */}
                {renderContent()}
            </div>
        </div>
    );
};

export default MatchDetailsPopup;