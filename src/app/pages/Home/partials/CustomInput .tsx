import { useEffect, useRef, useState } from 'react';
import editIconGreen from "../../../assets/BiEditAlt_Green.svg";
import editIconOrange from "../../../assets/BiEditAlt_Orange.svg";
import "../home.css";

interface CustomInputProps {
    type: "PLAYER" | "TEAM"; // Chọn giữa PLAYER hoặc TEAM
    initialLabel: string;
    onSave: (newLabel: string, type: "PLAYER" | "TEAM", order: number | null) => void;
    order: number | null
}

const CustomInput: React.FC<CustomInputProps> = ({ type, initialLabel, onSave, order }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(initialLabel);
    const inputRef = useRef<HTMLInputElement>(null); // Tạo ref cho input

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value); // Cập nhật giá trị khi người dùng nhập vào
    };

    const handleSave = () => {
        setIsEditing(false); // Dừng chế độ chỉnh sửa
        onSave(value, type, order);
    };

    const handleEditClick = () => {
        setIsEditing(true); // Bật chế độ chỉnh sửa
    };

    // Focus vào input khi chế độ chỉnh sửa được bật
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]); // Chạy lại khi isEditing thay đổi

    // Kiểu màu sắc và căn chỉnh tùy theo type
    const textStyle =
        type === "TEAM"
            ? "green text-center" // TEAM: màu xanh và căn giữa
            : "orange text-left"; // PLAYER: màu cam và căn trái

    // Biến này không được dùng trong phiên bản cuối nên có thể bỏ qua
    // const borderColor = type === "TEAM" ? "border-green-500" : "border-orange-500"; 

    return (
        <div className="flex items-center justify-between">
            {isEditing ? (
                <div
                    className={`flex flex-1 items-center gap-2 relative
                                ${type === "TEAM" ? "px-7 justify-center" : "px-0"}`}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={handleChange}
                        // THAY ĐỔI: Giảm font-size và bỏ border
                        className={`text-lg md:text-2xl ${textStyle} bg-transparent focus:outline-none focus:ring-0 w-full`}
                        style={{ textTransform: "none" }}
                    />
                    <button onClick={handleSave} 
                        // THAY ĐỔI: Giảm font-size cho nút Save
                        className={`${textStyle} text-base md:text-xl items-end absolute right-0 cursor-pointer`}>
                        Save
                    </button>
                </div>
            ) : (
                <div className={`flex flex-1 justify-center items-center gap-2 relative
                                ${type === "TEAM" ? "px-7" : "px-0"}
                            `}>
                    {/* THAY ĐỔI: Giảm font-size cho nhãn */}
                    <span className={`text-lg md:text-2xl ${textStyle} flex-1 text-center`}>{value}</span>
                    <button
                        onClick={handleEditClick}
                        className={`${textStyle} text-lg md:text-xl cursor-pointer absolute right-0`}
                    >
                        {type === "TEAM" ?
                            // THAY ĐỔI: Thêm kích thước cho icon
                            <img src={editIconGreen} alt='Edit Icon Green' className="w-5 h-5 md:w-6 md:h-6" />
                            :
                            // THAY ĐỔI: Thêm kích thước cho icon
                            <img src={editIconOrange} alt='Edit Icon Orange' className="w-5 h-5 md:w-6 md:h-6" />
                        }
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomInput;