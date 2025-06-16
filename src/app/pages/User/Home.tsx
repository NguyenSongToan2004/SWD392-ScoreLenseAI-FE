import "./home.css";
import HistoryTable from "./partials/HistoryTable";

export default function User() {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex-1 p-5 overflow-y-hidden">
                <HistoryTable />
            </div>
        </div>
    )
}