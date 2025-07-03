// src/pages/admin/partials/MatchDetailsPopup.tsx
import React, { useEffect, useState } from 'react';
import playingIcon from "../../../assets/playingIcon.svg";
import type { BilliardMatch, BilliardTable } from '../../../models/DataObject';
import { formatTime } from '../../../Utils/formatters';
import Duration from './Duration';
import { useNavigate } from 'react-router-dom';
import nextIcon from "../../../assets/GrNext.svg";

interface MatchDetailsPopupProps {
    table: BilliardTable;
    onClose: () => void;
    match: BilliardMatch | null;
}

// Helper to map modeID to game mode name
const getGameModeName = (modeId: number): string => {
    const modeMap: Record<number, string> = {
        1: '8-BALL',
        2: '9-BALL',
        3: 'ONE-CUSHION CAROOM',
        4: 'THREE-CUSHION CAROOM'
    };
    return modeMap[modeId] || 'CUSTOM';
};

export const MatchDetailsPopup: React.FC<MatchDetailsPopupProps> = ({ table, onClose, match }) => {
    const [mode, setMode] = useState<"match" | "detail">("match");
    const nav = useNavigate();

    const handleCreate = () => {
        nav(`/${table.billardTableID}`,
            {
                state: {
                    staffCreating: true,
                }
            }
        );
    };

    const handleModeToggle = () => {
        setMode(prevMode => prevMode === "match" ? "detail" : "match");
    };

    // Effect to close the popup when the 'Escape' key is pressed
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
        if (mode === "detail") {
            return (
                <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Table Information</h3>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-500">Table Name:</span>
                        <span className="text-gray-800 font-medium">{table.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-500">Table Code:</span>
                        <span className="text-gray-800 font-medium">{table.tableCode}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-500">Type:</span>
                        <span className="text-gray-800 font-medium">{table.tableType}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-500">Status:</span>
                        <span className={
                            `px-2.5 py-1 rounded-full font-bold text-xs capitalize ` +
                            (table.status === 'available' ? 'bg-green-100 text-green-700' :
                                table.status === 'inUse' ? 'bg-blue-100 text-blue-700' :
                                    table.status === 'underMaintainance' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700')
                        }>
                            {table.status === 'underMaintainance' ? 'Maintenance' : table.status}
                        </span>
                    </div>

                    <div>
                        {/* <p className="font-semibold text-gray-500 mt-2 mb-1">Description</p> */}
                        <p className="bg-gray-50 rounded-md p-3 text-gray-700 text-sm">
                            {table.description || "No description available."}
                        </p>
                    </div>
                </div>
            );
        }

        if (table.status === "available") {
            return (
                <div className="flex justify-center p-6">
                    <button
                        className="text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={handleCreate}
                        // Use the same background color as other primary buttons
                        style={{ backgroundColor: `var(--primary-color)` }}
                    >
                        <h5 className="text-base md:text-lg font-semibold">Create Match</h5>
                        <img src={nextIcon} alt="Create Match" className="w-5 h-5" />
                    </button>
                </div>
            );
        }

        if (table.status === "underMaintainance") {
            return <div className="text-center p-6 text-red-500">This table is under maintenance!</div>;
        }

        if (!match) {
            return <div className="text-center p-6 text-red-500">Could not load match details.</div>;
        }

        const teamA = match.teams.find(team => team.name === "TEAM A");
        const teamB = match.teams.find(team => team.name === "TEAM B");

        return (
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl font-bold text-gray-700">{table.tableCode}</div>
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
                        <ul className="bg-gray-100 rounded-md p-2 text-gray-800 list-disc list-inside">
                            {teamA?.players.map(p => (
                                <li key={p.playerID}>{p.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500 mb-1">TEAM B:</p>
                        <ul className="bg-gray-100 rounded-md p-2 text-gray-800 list-disc list-inside">
                            {teamB?.players.map(p => (
                                <li key={p.playerID}>{p.name}</li>
                            ))}
                        </ul>
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
            className="fixed inset-0  flex justify-center items-center z-50"
            onClick={onClose}
        >
            {/* Popup Card */}
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Card */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div className='flex flex-row gap-3 items-center'>
                        <h2 className="text-lg font-bold text-gray-800">DETAILS</h2>
                        <button
                            className="font-mono italic cursor-pointer w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 font-bold text-sm hover:bg-blue-50"
                            onClick={handleModeToggle}
                            title="Toggle details"
                        >
                            {mode === 'detail'
                                ? "m"
                                : "i"}
                        </button>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl cursor-pointer">&times;</button>
                </div>
                {/* Content Card */}
                {renderContent()}
            </div>
        </div>
    );
};

export default MatchDetailsPopup;
