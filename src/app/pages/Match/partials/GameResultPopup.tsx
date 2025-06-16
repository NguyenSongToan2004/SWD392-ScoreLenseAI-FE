import React from "react";
import checkCircle from "../../../assets/check-circle.png"
import "../home.css"

interface GameResultPopupProps {
    winner: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const GameResultPopup: React.FC<GameResultPopupProps> = ({ winner, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white flex flex-col gap-5 rounded-xl shadow-lg p-5 text-center max-w-5xl overflow-hidden">
                {/* Icon */}
                <div className="flex justify-center">
                    <img src={checkCircle} alt="Check Circle" className="w-20 h-auto" />
                </div>

                <div>
                    {/* Title */}
                    <h2 className="text-2xl text-black font-bold ">
                        CONGRATULATIONS
                        <span
                            className="mx-1"
                            style={{ color: `var(--primary-color)` }}
                        >
                            {winner.toUpperCase()}
                        </span>FOR WINNING!
                    </h2>
                    <p className="text-gray-600 text-md font-medium ">DO YOU WANT TO SAVE YOUR GAME RESULTS?</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="button-confirm cursor-pointer text-white px-4 py-2 rounded"
                    >
                        Let&apos;s go
                    </button>
                    <button
                        onClick={onCancel}
                        className="border bg-white border-red-500 text-red-500 px-4 py-2 rounded
                                hover:bg-gray-100 cursor-pointer
                                transition ease-in-out duration-300"
                    >
                        Not now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameResultPopup;
