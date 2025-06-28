import "./home.css";
import HistoryTable from "./usecases/HistoryTable";
import { isOpacityStore } from "./homeStore"

export default function User() {
    const isOpacity = isOpacityStore.use();
    return (
        <div className="h-full flex flex-col bg-white">
            {isOpacity && (
                <div className="absolute inset-0 bg-black opacity-30 z-50"></div>
            )}
            <div className="flex-1 p-5 overflow-y-hidden">
                <HistoryTable />
            </div>
        </div>
    )
}