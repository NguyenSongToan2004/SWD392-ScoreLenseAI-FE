
// import logo from "../../../assets/Logo_shadow.svg"
// import iconEdit from "../../../assets/Icon_Edit2.svg"
// import { type HeaderProps } from "../models/PartialModel"


// const Header = ({ set }: HeaderProps) => {
//     const 
//     return (
//         <div className="text-center flex justify-between items-center">
//             <div className="flex-1/3">
//                 <img src={logo} alt="Logo" className="w-32 h-32" />
//             </div>
//             <h3 className="flex-auto flex flex-col text-4xl font-bold">
//                 <span className="text-black text-center">TABLE: {table}</span>
//                 <span className="text-white text-3xl text-center">
//                     Round : {round}
//                 </span>
//             </h3>
//             <div className="flex-1/3 flex justify-end">
//                 <button className="flex flex-row items-center gap-3
//                          cursor-pointer text-1xl px-4 py-2 rounded-[10px]
//                           font-semibold shadow hover:bg-green-700 transition"
//                     style={{ backgroundColor: `var(--primary-color)` }}
//                 >
//                     <img src={iconEdit} alt="Icon Edit" className="w-6" />
//                     <span className="font-bold">EDIT POINT</span>
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Header

import logo from "../../../assets/Logo_shadow.svg"
import iconEdit from "../../../assets/Icon_Edit2.svg"
import { type HeaderProps } from "../models/PartialModel"

const Header = ({ setArray }: HeaderProps) => {
    
    // --- PHẦN LOGIC ĐƯỢC THÊM VÀO ---

    // 1. Tìm ra round đấu hiện tại.
    // Ưu tiên tìm set đang 'ongoing', nếu không có thì tìm set 'pending' đầu tiên.
    const currentSet = setArray.find(set => set.status === 'ongoing')
        || setArray.find(set => set.status === 'pending');

    // 2. Tạo chuỗi hiển thị cho round.
    // Ví dụ: "1 / 3", "2 / 3", hoặc "Finished" nếu tất cả đã xong.
    const totalRounds = setArray.length;
    const roundDisplay = currentSet
        ? `${currentSet.gameSetNo} / ${totalRounds}`
        : `Finished`;

    // --- KẾT THÚC PHẦN LOGIC ---

    return (
        <div className="text-center flex justify-between items-center">
            <div className="flex-1/3">
                <img src={logo} alt="Logo" className="w-32 h-32" />
            </div>
            <h3 className="flex-auto flex flex-col text-4xl font-bold">
                {/* Sử dụng prop tableName */}
                <span className="text-black text-center">Round : {roundDisplay}</span>
                <span className="text-white text-3xl text-center">
                    {/* Sử dụng biến đã được xử lý */}
                    Race To : {currentSet?.raceTo}
                </span>
            </h3>
            <div className="flex-1/3 flex justify-end">
                <button className="flex flex-row items-center gap-3
                                 cursor-pointer text-1xl px-4 py-2 rounded-[10px]
                                  font-semibold shadow hover:bg-green-700 transition"
                    style={{ backgroundColor: `var(--primary-color)` }}
                >
                    <img src={iconEdit} alt="Icon Edit" className="w-6" />
                    <span className="font-bold">SETTING</span>
                </button>
            </div>
        </div>
    )
}

export default Header;
