import type { Store } from 'antd/es/form/interface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getNavigationState } from '../../../Utils/navigationUtils';
import { fetchStoreAPI } from '../services/FetchAPI';
import { toast } from 'sonner';


const InputStore = () => {

    const loc = useLocation();

    const [store, setStore] = useState<Store | null>(null);

    useEffect(() => {
        const loadStore = async () => {
            // Thử lấy từ navigation state trước
            const storeFromState = getNavigationState(loc, 'store');
            
            if (storeFromState) {
                setStore(storeFromState);
            } else {
                // Nếu không có trong state, fetch từ API
                const storeID = localStorage.getItem("storeID");
                
                if (storeID) {
                    try {
                        const response = await fetchStoreAPI(storeID);
                        if (response.status === 200) {
                            setStore(response.data);
                        } else {
                            toast.error(response.message || 'Failed to fetch store');
                            setStore(null);
                        }
                    } catch (error) {
                        toast.error('Error fetching store data');
                        setStore(null);
                    }
                }
            }
        };

        loadStore();
    }, [loc]);

    return (
        <>
            <input
                type="text"
                value={store?.name || ''}
                readOnly
                className="text-green-800 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </>
    )
}

export default InputStore
