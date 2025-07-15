import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import checkCircle from "../../../assets/check-circle.png"; // Cập nhật đường dẫn nếu cần
import NInputLabel from "../../../components/basicUI/NInputLabel";
import NSelect from "../../../components/basicUI/NSelect"; // [THAY ĐỔI] Import NSelect tùy chỉnh của bạn
import type { Team } from "../../../models/DataObject";
import "../home.css"; // Cập nhật đường dẫn nếu cần
import { savePlayerAPI } from "../services/FetchAPI";

// [THAY ĐỔI] Cập nhật props interface
interface GameResultPopupProps {
    winner: string;
    playerArray: Team[];
}

const GameResultPopup: React.FC<GameResultPopupProps> = ({ winner, playerArray }) => {
    const nav = useNavigate();

    const [step, setStep] = useState<'result' | 'selectPlayer'>('result');
    // [THAY ĐỔI] ID của player là number theo interface
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
    const [info, setInfo] = useState<string | undefined>(undefined);
    // [THAY ĐỔI] Sử dụng useMemo để chuyển đổi và tối ưu hóa việc tạo options cho NSelect.
    // Logic này sẽ chỉ chạy lại khi `playerArray` thay đổi.
    const playerOptions = useMemo(() => {
        if (!playerArray) return [];
        // Làm phẳng mảng các đội thành một mảng người chơi duy nhất
        return playerArray.flatMap(team =>
            team.players.map(player => ({
                value: player.playerID,
                // Tạo label dễ hiểu: "Tên người chơi (Tên đội)"
                label: `${player.name} (${team.name})`
            }))
        );
    }, [playerArray]);

    // Hàm chuyển sang bước chọn người chơi
    const handleShowPlayerSelect = () => {
        // Nếu có người chơi trong danh sách, chọn người đầu tiên làm mặc định
        if (playerOptions.length > 0) {
            setSelectedPlayerId(playerOptions[0].value);
            setStep('selectPlayer');
        } else {
            console.warn("Không có người chơi nào để lựa chọn.");
            // Có thể hiển thị thông báo lỗi hoặc xử lý khác ở đây
        }
    };



    // Hàm lưu kết quả và điều hướng
    const handleSaveResult = () => {
        if (selectedPlayerId === undefined) {
            toast.warning('Please choose player !')
            return;
        }

        if (info === undefined || info.length == 0) {
            toast.warning('Please enter gmail or phone number !');
            return;
        }

        const savePlayer = async () => {
            const response = await savePlayerAPI(selectedPlayerId, info);
            if (response.status === 200) {
                console.log("Player ID đã chọn để lưu:", selectedPlayerId);
                toast.success(response.message);
                nav("/user");
            } else {
                toast.error(response.message);
            }
        }

        savePlayer();
    };

    const handleInputName = (value: string) => {
        setInfo(value);
    };

    const handleCancel = () => {
        nav("/");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white flex flex-col gap-5 rounded-xl shadow-lg p-4 md:p-6 text-center w-full max-w-sm md:max-w-md overflow-hidden">
                {step === 'result' ? (
                    <>
                        {/* Giao diện chúc mừng */}
                        <div className="flex justify-center">
                            <img src={checkCircle} alt="Check Circle" className="w-16 md:w-20 h-auto" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl text-black font-bold">
                                CONGRATULATIONS
                                <span className="mx-1" style={{ color: `var(--primary-color)` }}>
                                    {winner.toUpperCase()}
                                </span> FOR WINNING!
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base font-medium mt-1">
                                DO YOU WANT TO SAVE YOUR GAME RESULTS?
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                                onClick={handleShowPlayerSelect}
                                className="button-confirm cursor-pointer text-white px-4 py-2 rounded text-base md:text-lg"
                            >
                                Let's go
                            </button>
                            <button
                                onClick={handleCancel}
                                className="border bg-white border-red-500 text-red-500 px-4 py-2 rounded hover:bg-gray-100 transition ease-in-out duration-300 text-base md:text-lg"
                            >
                                Not now
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Giao diện chọn người chơi */}
                        <div>
                            <h2 className="text-xl md:text-2xl text-black font-bold">SAVE RESULT</h2>
                            <p className="text-gray-600 text-sm md:text-base font-medium mt-1">
                                SELECT PLAYER TO SAVE THE RESULT FOR
                            </p>
                        </div>

                        {/* [THAY ĐỔI] Tích hợp NSelect component */}
                        <div className="w-full text-left">
                            <NSelect
                                label="Select player"
                                options={playerOptions}
                                value={selectedPlayerId}
                                onChange={(value) => setSelectedPlayerId(value)}
                                showSearch 
                                allowClear 
                                style={{ width: '100%' }}
                            />
                        </div>

                        <NInputLabel
                            label="Select player"
                            onChange={(e) => handleInputName(e.target.value)} // e là ChangeEvent, lấy value
                        />

                        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
                            <button
                                onClick={handleSaveResult}
                                className="button-confirm cursor-pointer text-white px-4 py-2 rounded text-base md:text-lg"
                            >
                                Save Result
                            </button>
                            <button
                                onClick={() => setStep('result')}
                                className="border bg-white border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition ease-in-out duration-300 text-base md:text-lg"
                            >
                                Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GameResultPopup;