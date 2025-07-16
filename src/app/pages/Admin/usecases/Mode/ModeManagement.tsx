import { useEffect, useState } from "react";
import type { Mode } from "../../../Home/models/DataObject";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteModeAPI, fetchModesAPI } from "../../services/FetchAPI";
import { toast } from "sonner";

const ModeManagement = () => {
    const [modeList, setModeList] = useState<Mode[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        const fetchMode = async () => {
            try {
                const response = await fetchModesAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setModeList(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch mode data.');
                    setModeList([]);
                }
            } catch (error) {
                setModeList([]);
            }
        }
        fetchMode();
    }, [isLoad])

    const handleCreate = () => {
        const userInfo = loc.state?.userInfor;
        const store = loc.state?.store;
        nav(`/admin/mode-management/create`, {
            state: {
                userInfo: userInfo,
                store: store
            }
        });
    }

    const handleAction = (actionType: 'detail' | 'edit' | 'delete', mode: Mode) => {
        const userInfo = loc.state?.userInfor;
        const store = loc.state?.store;
        switch (actionType) {
            case 'detail':
                nav(`/admin/mode-management/detail/${mode.modeID}`, {
                    state: {
                        mode: mode,
                        userInfo: userInfo,
                        store: store
                    }
                });
                break;
            case 'edit':
                nav(`/admin/mode-management/edit/${mode.modeID}`, {
                    state: {
                        mode,
                        userInfo,
                        store
                    }
                });
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete mode ${mode.name}?`)) {
                    const deleteMode = async () => {
                        const response = await deleteModeAPI(mode.modeID as number);
                        if (response.status === 200) {
                            setIsLoad(true);
                            toast.success(response.message);
                        } else {
                            toast.error(response.message);
                        }
                    }
                    deleteMode();
                }
                break;
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto bg-white rounded-2xl">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 inline-block mr-10">Mode Management</h2>
                <button
                    onClick={handleCreate}
                    className="border rounded-xl px-2 py-2 border-green text-green-800 cursor-pointer hover:bg-green-800 hover:text-white mb-2">
                    <strong className="text-2xl">+</strong> Create Mode
                </button>
            </div>

            <div className="shadow-md rounded-lg overflow-hidden">
                {modeList.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left text-gray-700">
                            <thead className="text-2xl text-gray-800 uppercase bg-gray-100 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="max-h-96 overflow-y-auto">
                                {modeList.map((mode) => (
                                    <tr key={mode.modeID} className="bg-white border-b hover:bg-gray-50 text-xl">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{mode.modeID}</td>
                                        <td className="px-6 py-4">{mode.name}</td>
                                        <td className="px-6 py-4 truncate max-w-sm" title={mode.description}>
                                            {mode.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <button
                                                    title="Detail"
                                                    className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("detail", mode)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("edit", mode)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="text-red-500 hover:text-red-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("delete", mode)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center py-10 text-lg text-gray-500">No mode data to display.</p>
                )}
            </div>
        </div>
    )
}

export default ModeManagement
