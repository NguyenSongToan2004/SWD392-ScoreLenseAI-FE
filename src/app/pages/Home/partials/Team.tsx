import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import backIcon from "../../../assets/GrBack.svg";
import nextIcon from "../../../assets/GrNext.svg";
import { matchSetUpStore, isOpacityStore } from "../homeStore";
import { setDefaultTeamConfig } from '../services/Function';
import RoundModal from './RoundModal';
import type ResponseAPI from '../../../models/ResponseAPI';
import { createBillardMatchAPI } from '../services/FetchAPI';
import type { BilliardMatch } from '../../../models/DataObject';
import type { MatchSetup } from '../models/DataObject';

const Team = () => {
    const nav = useNavigate();
    const [selectedMode, setSelectedMode] = useState<string | null>(null);  // State to track selected mode
    const [isModalOpen, setIsModalOpen] = useState(false);
    const matchSetUp = matchSetUpStore.use();
    const handleSelectGame = (mode: string | "1 VS 1" | "2 VS 2" | "SCOTCH DOUBLE" | "CUSTOME") => {
        const resetTeam = () => {
            matchSetUpStore.set((prev) => {
                prev.value.setUp = "1vs1";
                prev.value.teamConfigs = setDefaultTeamConfig("RESET");
            });
        };
        resetTeam();
        // Xử lý hành động dựa trên chế độ được chọn
        switch (mode) {
            case "1 VS 1":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "1 VS 1";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);  // Update selectedMode
                nav("/team/list");
                break;
            case "2 VS 2":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "2 VS 2";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);  // Update selectedMode
                nav("/team/list");
                break;
            case "SCOTCH DOUBLE":
                matchSetUpStore.set((prev) => {
                    prev.value.setUp = "SCROTCH DOUBLE";
                    prev.value.teamConfigs = setDefaultTeamConfig(mode);
                });
                setSelectedMode(mode);  // Update selectedMode
                nav("/team/list");
                break;
            case "CUSTOME":
                console.log("Selected: CUSTOM");
                // Thực hiện hành động khi chọn CUSTOM
                // nav("/custom") // Ví dụ điều hướng trang khác
                break;
            default:
                break;
        }
    };

    const handleStart = (round: number, raceTo: number) => {
        matchSetUpStore.set((prev) => {
            prev.value.raceTo = raceTo,
                prev.value.totalSet = round
        })
        const createMatch = async () => {
            const response: ResponseAPI = await createBillardMatchAPI(matchSetUp as MatchSetup);
            if (response.status == 200) {
                console.log(response.data);
                nav("/match");
            }
        }
        createMatch();
    };

    const handleNext = () => {
        isOpacityStore.set((prev) => {
            prev.value = true;
        })
        setIsModalOpen(true);
    };

    const handleClose = () => {
        isOpacityStore.set((prev) => {
            prev.value = false;
        })
        setIsModalOpen(false);
    };


    const handleBack = () => {
        matchSetUpStore.set((prev) => {
            prev.value.modeID = null;
        });
        nav("/match");
    };

    return (
        <>
            <div className="w-1/2">
                <h2 className="text-6xl text-center green mt-2 mb-6">CREATE TEAM</h2>

                {/* Buttons */}
                <div className="flex flex-row gap-3 w-full">
                    {["1 VS 1", "2 VS 2", "SCOTCH DOUBLE", "CUSTOME"].map((mode, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectGame(mode)}
                            className="bg-button text-white py-1 text-3xl border-1
                             border-green-200 rounded-md cursor-pointer font-light flex-1"
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-1/2 flex justify-between">
                {/* Set dynamic key for Outlet to trigger re-render */}
                <Outlet key={selectedMode} />
            </div>

            {/* Bottom Left Icon */}
            <div className="absolute bottom-2 left-2">
                <button
                    className="text-button px-3 py-1 text-xl
                 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleBack}
                >
                    <img src={backIcon} alt="Next Icon" />
                    <h5 className="text-2xl font-thin">BACK</h5>
                </button>
            </div>

            {/* Bottom Right Next Button */}
            <div className="absolute bottom-2 right-2">
                <button
                    className="text-button px-3 py-1 text-xl
                 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleNext}
                >
                    <h5 className="text-2xl font-thin">NEXT</h5>
                    <img src={nextIcon} alt="Next Icon" />
                </button>
            </div>

            {isModalOpen && (
                <RoundModal onClose={handleClose} onStart={handleStart} />
            )}
        </>
    );
};

export default Team;
