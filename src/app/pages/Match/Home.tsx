
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import BackLog from "./partials/BackLog";
import TableScore from "./partials/TableScore";
import Header from "./partials/Header";
import GameResultPopup from "./partials/GameResultPopup";
import billardMatchMock from "../../../mocks/BillardMatch_Mock.json";
import { type BilliardMatch } from "../../models/DataObject"
export default function Match() {
    const location = useLocation();
    const nav = useNavigate();
    const codeMatch = location.state?.codeMatch;
    const [showPopup, setShowPopup] = useState(false);
    const [winnerName, setWinnerName] = useState<string>("");
    const matched: BilliardMatch = billardMatchMock as BilliardMatch;

    useEffect(() => {
        if (!codeMatch) {
            nav("/");
        }

        if (matched && matched.status === "completed") {
            setWinnerName(matched.winner || "Unknown");
            setShowPopup(true);
        }
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col gap-5 text-white font-sans px-6 py-4 overflow-hidden gradient-bg">

            {/* Header */}
            <section className="flex-auto">
                <Header codeMatch={codeMatch} />
            </section>

            {/* Scoreboard */}
            <section className="flex-1/2">
                <TableScore teamID={matched?.billiardMatchID} />
            </section>

            {/* Log History */}
            <section className="flex-1/2 overflow-y-hidden">
                <BackLog />
            </section>

            {/*Popup End Game */}
            <section>
                {showPopup && <GameResultPopup
                    winner={winnerName}
                />}
            </section>
        </div>

    )
}