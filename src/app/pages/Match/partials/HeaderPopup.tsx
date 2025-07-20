import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logoutAPI } from '../../Home/services/FetchAPI';
import { cancelMatchAPI } from '../services/FetchAPI';

interface HeaderPopupProps {
    isOpen: boolean;
    onClose: () => void;
    matchID: number;
    teamID: number;
}

const HeaderPopup: React.FC<HeaderPopupProps> = ({ isOpen, onClose, matchID, teamID }) => {
    const nav = useNavigate();

    if (!isOpen) return null;

    const handleCancelMatch = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this match?");
        if (confirmed) {
            try {
                const response = await cancelMatchAPI(matchID, teamID, "cancel");
                if (response.status === 200) {
                    toast.success(response.message);
                    nav("/");
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error("Failed to cancel match");
            }
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userID');
        localStorage.removeItem('staffID');
        localStorage.removeItem('role');
        localStorage.removeItem('customerName');
        localStorage.removeItem('storeID');

        try {
            const response = await logoutAPI();
            if (response.status === 200) {
                toast.success(response.message || "Logged out successfully!");
            } else {
                toast.error(response.message || "An error occurred during logout.");
            }
        } catch (error) {
            toast.error("Could not connect to the server to log out.");
        } finally {
            nav("/login");
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={onClose}
            />
            
            {/* Popup */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 min-w-[300px]">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Match Options</h3>
                
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleCancelMatch}
                        className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                        Cancel Match
                    </button>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                    >
                        Logout
                    </button>
                    
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default HeaderPopup;