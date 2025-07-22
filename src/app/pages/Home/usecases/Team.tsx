import { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import backIcon from "../../../assets/GrBack.svg";
import nextIcon from "../../../assets/GrNext.svg";
import type ResponseAPI from '../../../models/ResponseAPI';
import { isOpacityStore, matchSetUpStore } from "../homeStore";
import type { BilliardMatch, MatchSetup } from '../models/DataObject';
import RoundModal from '../partials/RoundModal';
import { createBillardMatchAPI } from '../services/FetchAPI';
import { setDefaultTeamConfig } from '../services/Function';
import { toast } from 'sonner';

const Team = () => {
    const nav = useNavigate();
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preloadedComponents, setPreloadedComponents] = useState<Set<string>>(new Set());
    const matchSetUp = matchSetUpStore.use();

    // Preload components khi hover vào mode tabs
    const preloadModeComponent = useCallback((mode: string) => {
        if (!preloadedComponents.has(mode)) {
            setPreloadedComponents(prev => new Set(prev).add(mode));
            
            // Dynamic import based on mode
            switch (mode) {
                case '1 VS 1':
                    // Preload components cho chế độ 1vs1
                    import('../partials/TeamCard');
                    import('../partials/TeamList');
                    import('../../Match/Home');
                    import('../../Match/partials/TableScore');
                    break;
                case '2 VS 2':
                    // Preload components cho chế độ 2vs2
                    import('../partials/TeamCard');
                    import('../partials/TeamList');
                    import('../partials/RoundModal');
                    import('../../Match/Home');
                    import('../../Match/partials/TableScore');
                    import('../../Match/partials/Header');
                    break;
                case 'SCOTCH DOUBLE':
                    // Preload components cho chế độ scotch double
                    import('../partials/TeamCard');
                    import('../partials/TeamList');
                    import('../partials/RoundModal');
                    import('../../Match/Home');
                    import('../../Match/partials/TableScore');
                    import('../../Match/partials/Header');
                    import('../../Match/partials/GameResultPopup');
                    break;
                default:
                    break;
            }
        }
    }, [preloadedComponents]);

    const handleSelectGame = (mode: string) => {
        const resetTeam = () => {
            matchSetUpStore.set((prev) => {
                prev.value.setUp = "1vs1";
                prev.value.teamConfigs = setDefaultTeamConfig("RESET");
            });
        };
        resetTeam();
        switch (mode) {
            case "1 VS 1":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "1 VS 1";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);
                nav("/team/list");
                break;
            case "2 VS 2":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "2 VS 2";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);
                nav("/team/list");
                break;
            case "SCOTCH DOUBLE":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "SCOTCH DOUBLE";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);
                nav("/team/list");
                break;
            case "CUSTOME":
                console.log("Selected: CUSTOM");
                toast.info('This function is upgrading !');
                break;
            default:
                break;
        }
    };

    const handleStart = () => {
        toast.promise(
            (async () => {
                const response: ResponseAPI = await createBillardMatchAPI(matchSetUp as MatchSetup);
                if (response.status === 200) {
                    const createdMatch: BilliardMatch = response.data;
                    nav(`/match/${createdMatch.billiardMatchID}`, {
                        state: {
                            match: createdMatch
                        }
                    });
                } else {
                    throw new Error("Fail to create match!");
                }
            })(),
            {
                loading: "Creating...",
                success: "Create sucessfully!",
                error: "Has error when create match!"
            }
        );
    };

    const handleNext = () => {
        isOpacityStore.set((prev) => { prev.value = true; });
        setIsModalOpen(true);
    };

    const handleClose = () => {
        isOpacityStore.set((prev) => { prev.value = false; });
        setIsModalOpen(false);
    };

    const handleBack = () => {
        matchSetUpStore.set((prev) => { prev.value.modeID = null; });
        nav(-1); // Quay lại trang trước đó
    };

    return (
        <>
            {/* THAY ĐỔI: Container chính chiếm toàn bộ chiều rộng trên mobile và giới hạn lại trên desktop */}
            <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center">
                {/* THAY ĐỔI: Giảm font-size cho mobile */}
                <h2 className="text-3xl md:text-6xl text-center green mt-2 mb-3 md:mb-6">CREATE TEAM</h2>

                {/* THAY ĐỔI: Thêm flex-wrap và giảm font-size các nút cho mobile */}
                <div className="flex flex-row flex-wrap gap-2 w-full">
                    {["1 VS 1", "2 VS 2", "SCOTCH DOUBLE"].map((mode, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectGame(mode)}
                            onMouseEnter={() => preloadModeComponent(mode)}
                            className={`text-white py-1 md:py-2 border-1 border-green-200 rounded-md cursor-pointer font-light flex-1
                                 text-sm md:text-2xl lg:text-3xl bg-button
                                 ${matchSetUp.setUp === mode ? 'selected' : ''}
                              `}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* THAY ĐỔI: Container cho Outlet chiếm toàn bộ chiều rộng */}
            <div className="w-full md:w-3/4 lg:w-1/2 flex justify-between">
                <Outlet key={selectedMode} />
            </div>

            {/* Bottom Left Icon */}
            <div className="absolute bottom-2 left-2">
                <button
                    className="text-button px-3 py-1 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleBack}
                >
                    <img src={backIcon} className='h-auto w-5' alt="Back Icon" />
                    {/* THAY ĐỔI: Giảm font-size cho mobile */}
                    <h5 className="text-sm md:text-2xl font-thin">BACK</h5>
                </button>
            </div>

            {/* Bottom Right Next Button */}
            <div className="absolute bottom-2 right-2">
                <button
                    className="text-button px-3 py-1 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleNext}
                >
                    {/* THAY ĐỔI: Giảm font-size cho mobile */}
                    <h5 className="text-sm md:text-2xl font-thin">NEXT</h5>
                    <img src={nextIcon} className='h-auto w-5' alt="Next Icon" />
                </button>
            </div>

            {isModalOpen && (
                <RoundModal onClose={handleClose} onStart={handleStart} />
            )}
        </>
    );
};

export default Team;
