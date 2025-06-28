// import React from "react";
// import checkCircle from "../../../assets/check-circle.png"
// import "../home.css"
// import { useNavigate } from "react-router-dom";

// interface GameResultPopupProps {
//     winner: string;
// }

// const GameResultPopup: React.FC<GameResultPopupProps> = ({ winner }) => {
//     const nav = useNavigate();
//     const moveUser = (type: "confirm" | "cancel") => {
//         if (type === "confirm") {
//             nav("/user")
//             return;
//         }
//         nav("/");
//     }
    
//     return (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//             <div className="bg-white flex flex-col gap-5 rounded-xl shadow-lg p-5 text-center max-w-5xl overflow-hidden">
//                 {/* Icon */}
//                 <div className="flex justify-center">
//                     <img src={checkCircle} alt="Check Circle" className="w-20 h-auto" />
//                 </div>

//                 <div>
//                     {/* Title */}
//                     <h2 className="text-2xl text-black font-bold ">
//                         CONGRATULATIONS
//                         <span
//                             className="mx-1"
//                             style={{ color: `var(--primary-color)` }}
//                         >
//                             {winner.toUpperCase()}
//                         </span>FOR WINNING!
//                     </h2>
//                     <p className="text-gray-600 text-md font-medium ">DO YOU WANT TO SAVE YOUR GAME RESULTS?</p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-center gap-4">
//                     <button
//                         onClick={() => moveUser("confirm")}
//                         className="button-confirm cursor-pointer text-white px-4 py-2 rounded"
//                     >
//                         Let&apos;s go
//                     </button>
//                     <button
//                         onClick={() => moveUser("cancel")}
//                         className="border bg-white border-red-500 text-red-500 px-4 py-2 rounded
//                                 hover:bg-gray-100 cursor-pointer
//                                 transition ease-in-out duration-300"
//                     >
//                         Not now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GameResultPopup;

// src/pages/Match/partials/GameResultPopup.js

import React from "react";
import { useNavigate } from "react-router-dom";
import checkCircle from "../../../assets/check-circle.png";
import "../home.css";

interface GameResultPopupProps {
    winner: string;
}

const GameResultPopup: React.FC<GameResultPopupProps> = ({ winner }) => {
    const nav = useNavigate();
    const moveUser = (type: "confirm" | "cancel") => {
        if (type === "confirm") {
            nav("/user");
            return;
        }
        nav("/");
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            {/* THAY ĐỔI: Điều chỉnh chiều rộng và padding */}
            <div className="bg-white flex flex-col gap-4 rounded-xl shadow-lg p-4 md:p-6 text-center w-full max-w-sm md:max-w-md overflow-hidden">
                <div className="flex justify-center">
                    {/* THAY ĐỔI: Điều chỉnh kích thước icon */}
                    <img src={checkCircle} alt="Check Circle" className="w-16 md:w-20 h-auto" />
                </div>

                <div>
                    {/* THAY ĐỔI: Điều chỉnh kích thước chữ */}
                    <h2 className="text-xl md:text-2xl text-black font-bold ">
                        CONGRATULATIONS
                        <span
                            className="mx-1"
                            style={{ color: `var(--primary-color)` }}
                        >
                            {winner.toUpperCase()}
                        </span>FOR WINNING!
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base font-medium mt-1">DO YOU WANT TO SAVE YOUR GAME RESULTS?</p>
                </div>

                {/* THAY ĐỔI: Stack các nút trên màn hình rất nhỏ */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                        onClick={() => moveUser("confirm")}
                        className="button-confirm cursor-pointer text-white px-4 py-2 rounded text-base md:text-lg"
                    >
                        Let's go
                    </button>
                    <button
                        onClick={() => moveUser("cancel")}
                        className="border bg-white border-red-500 text-red-500 px-4 py-2 rounded
                                   hover:bg-gray-100 cursor-pointer
                                   transition ease-in-out duration-300 text-base md:text-lg"
                    >
                        Not now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameResultPopup;