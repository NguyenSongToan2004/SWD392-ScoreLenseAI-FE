import nextIcon from "../../../assets/GrNext.svg";
import iconCornerDecor from "../../../assets/Home_Icon_Corner.png";
import iconCorner from "../../../assets/Home_Icon_Corner_left.png";

const ModelSkeleton = () => {
    // Tạo một mảng giả để lặp và hiển thị các nút skeleton
    // Số lượng (ở đây là 4) có thể tùy chỉnh cho giống với số lượng mode thường có
    const skeletonButtons = [...Array(4)];

    return (
        <>
            <div className="w-4/5 max-w-md flex flex-col items-center">
                {/* Tiêu đề tĩnh */}
                <h2 className="text-4xl md:text-6xl green mt-2 mb-6 text-center">SELECT GAME MODE</h2>

                {/* Các nút bấm ở trạng thái loading */}
                <div className="flex flex-col gap-3 w-full z-20">
                    {skeletonButtons.map((_, index) => (
                        <div
                            key={index}
                            // Sử dụng lại các class về kích thước, padding, bo góc của nút thật
                            // Thay thế background và text bằng màu xám và hiệu ứng animate-pulse
                            className="
                                py-2 md:py-3 text-xl md:text-3xl rounded-md
                                bg-gray-700/50 animate-pulse h-[52px] md:h-[68px]
                            "
                        >
                            {/* Không hiển thị text */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Icon góc dưới bên trái (giữ nguyên vì nó là tĩnh) */}
            <div className="absolute left-0 bottom-0 z-10">
                <div className="relative w-30 md:w-50 h-auto">
                    <img src={iconCorner} alt="corner" className="w-full h-auto" />
                    <span className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2
                        text-black text-7xl md:text-9xl font-bold z-10">
                        8
                    </span>
                    <img src={iconCornerDecor} alt="Icon Corner Decor"
                        className="w-6 md:w-8 h-auto absolute top-1/3 right-3"
                    />
                </div>
            </div>

            {/* Nút Next góc dưới bên phải (giữ nguyên vì nó là tĩnh) */}
            <div className="absolute bottom-2 right-2">
                <button
                    className="text-button px-3 py-1 text-xl
                    rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    // Vô hiệu hóa nút khi đang loading
                    disabled
                >
                    <h5 className="text-sm md:text-2xl font-thin">NEXT</h5>
                    <img src={nextIcon} alt="Next Icon" />
                </button>
            </div>
        </>
    )
}

export default ModelSkeleton;