import { useEffect, useState } from 'react';
import type { BilliardTable } from '../../../models/DataObject';
import type ResponseAPI from '../../../models/ResponseAPI';
import { fetchTableAPI } from '../services/FetchAPI';

interface TableInfoProps {
    tableID: string;
}

const TableInfo = ({ tableID }: TableInfoProps) => {
    const [table, setTable] = useState<BilliardTable>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTable = async () => {
            setLoading(true);
            const response: ResponseAPI = await fetchTableAPI(tableID);
            if (response.status === 200) {
                setTable(response.data);
            } else {
                window.alert('Có lỗi: ' + response.message);
            }
            setLoading(false);
        };
        getTable();
    }, [tableID]);

    return (
        <>
            {loading ? (
                <div className="inline-block h-[1.25em] w-24 bg-gray-300 animate-pulse rounded align-middle" />
            ) : (
                <span>{table?.tableCode}</span>
            )}
        </>
    );
};

export default TableInfo;
