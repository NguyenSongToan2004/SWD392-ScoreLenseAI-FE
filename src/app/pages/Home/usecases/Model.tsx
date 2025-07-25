import { useNavigate } from 'react-router-dom';
import nextIcon from "../../../assets/GrNext.svg";
import iconCornerDecor from "../../../assets/Home_Icon_Corner.png";
import iconCorner from "../../../assets/Home_Icon_Corner_left.png";
import { useEffect, useState } from 'react';
import type ResponseAPI from '../../../models/ResponseAPI';
import { fetchModeAPI } from '../services/FetchAPI';
import type { Mode } from '../models/DataObject';
import { matchSetUpStore } from "../homeStore";
import { toast } from 'sonner';
import ModelSkeleton from '../partials/ModelSkeleton'; // <-- 1. Import skeleton component

const Model = () => {
    const nav = useNavigate();
    const [modeList, setModeList] = useState<Mode[]>([]);
    const [isLoading, setIsLoading] = useState(true); // <-- 2. Thêm state loading
    const matchSetUp = matchSetUpStore.use();

    const handleSelectGame = (modeID: number) => {
        console.log(modeID);
        if (modeID === 5 || modeID === 6) {
            toast.info('This function is coming soon !')
        } else {
            matchSetUpStore.set((prev) => {
                prev.value.modeID = modeID;
            })
        }
    };

    const handleNext = () => {
        if (matchSetUp.modeID === null) {
            toast.warning('Please choose mode game !')
        } else {
            nav("/team", {
                state: {
                    matchSetup: matchSetUp
                }
            })
        }
    }

    useEffect(() => {
        const loadMode = async () => {
            try {
                const response: ResponseAPI = await fetchModeAPI();
                setModeList(response.data);
            } catch (error) {
                console.error("Failed to fetch modes:", error);
                toast.error("Failed to load game modes.");
            } finally {
                setIsLoading(false); // <-- 3. Set loading thành false sau khi API kết thúc (dù thành công hay thất bại)
            }
        }

        loadMode();
    }, [])

    // <-- 4. Render skeleton nếu đang loading
    if (isLoading) {
        return <ModelSkeleton />;
    }

    return (
        <>
            <div className="w-4/5 max-w-md flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl green mt-2 mb-6 text-center">SELECT GAME MODE</h2>
                <div className="flex flex-col gap-3 w-full z-20">
                    {modeList.map((mode) => (
                        <button
                            key={mode.modeID}
                            onClick={() => handleSelectGame(mode.modeID)}
                            className={`
                                py-2 md:py-3 text-xl md:text-3xl border-1 border-green-200 rounded-md
                                cursor-pointer font-light text-white bg-button
                                ${matchSetUp.modeID === mode.modeID
                                    ? 'selected' // Chỉ thêm class 'selected'
                                    : ''
                                }
                            `}
                        >
                            {mode.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Left Icon */}
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

            {/* Bottom Right Next Button */}
            <div className="absolute bottom-2 right-2">
                <button
                    className="text-button px-3 py-1 text-xl
                    rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleNext}
                >
                    <h5 className="text-sm md:text-2xl font-thin">NEXT</h5>
                    <img src={nextIcon} alt="Next Icon" />
                </button>
            </div>
        </>
    )
}

export default Model;