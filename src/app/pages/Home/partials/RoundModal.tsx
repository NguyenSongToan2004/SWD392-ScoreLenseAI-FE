import { useState, type ChangeEvent } from 'react';
import "../home.css"
import { matchSetUpStore } from "../homeStore";
interface RoundModalProps {
    onClose: () => void;
    // onStart: (round: number, raceTo: number) => void;
    onStart: () => void;

}

const RoundModal = ({ onClose, onStart }: RoundModalProps) => {
    const [round, setRound] = useState(1);
    const [raceTo, setRaceTo] = useState(3);

    const handleStart = () => {
        onStart();
        onClose();
    };

    const handleRoundChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRound(Number(e.target.value));  // Đảm bảo giá trị trả về là một số
        matchSetUpStore.set((prev) => {
            prev.value.totalSet = Number(e.target.value)
        })
    };

    const handleRaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRaceTo(Number(e.target.value));  // Đảm bảo giá trị trả về là một số
        matchSetUpStore.set((prev) => {
            prev.value.raceTo = Number(e.target.value)
        })
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className="bg-white p-6 rounded-lg w-1/3 opacity-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-thin">Round</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-4xl"
                    >
                        &times;
                    </button>
                </div>
                <hr />
                <div className='flex flex-row gap-5 py-2'>
                    <div className="relative mb-4 flex-1">
                        <label
                            htmlFor="round"
                            className="absolute text-xl bg-white font-medium text-gray-700 left-8 -top-2 green"
                        >
                            Number of Round
                        </label>
                        <select
                            id="round"
                            value={round}
                            onChange={handleRoundChange}
                            className="mt-1 block w-full px-3 py-2 border-2
                             border-gray-300 rounded-md shadow-sm focus:outline-none
                             border-color text-2xl font-thin"
                        >
                            {[1, 2, 3, 4, 5].map((roundOption) => (
                                <option key={roundOption} value={roundOption}>
                                    <span className="green">#</span>  {roundOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative mb-4 flex-1">
                        <label
                            htmlFor="raceTo"
                            className="absolute text-xl bg-white font-medium text-gray-700 left-8 -top-2 green"
                        >
                            Race To
                        </label>
                        <select
                            id="raceTo"
                            value={raceTo}  // Đảm bảo sử dụng đúng state cho raceTo
                            onChange={handleRaceChange}
                            className="mt-1 block w-full px-3 py-2 border-2
                             border-gray-300 rounded-md shadow-sm focus:outline-none
                             border-color text-2xl font-thin"
                        >
                            {[1, 2, 3, 4, 5].map((raceOption) => (
                                <option key={raceOption} value={raceOption}>
                                    <span className="green">#</span>  {raceOption}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="flex justify-end gap-4 mt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xl text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleStart}
                        className="px-4 py-2 text-xl text-white  rounded-md cursor-pointer"
                        style={{ backgroundColor: `var(--primary-color)` }}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoundModal;
