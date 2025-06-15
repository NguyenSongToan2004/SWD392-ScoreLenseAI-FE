
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import BackLog from "./partials/BackLog";
import TableScore from "./partials/TableScore";
import Header from "./partials/Header";
export default function Match() {
    const location = useLocation();
    const nav = useNavigate();
    const codeMatch = location.state?.codeMatch;

    useEffect(() => {
        if (!codeMatch) {
            nav("/");
        }
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col gap-5 text-white font-sans px-6 py-4 gradient-bg">

            {/* Header */}
            <section className="flex-auto">
                <Header codeMatch={codeMatch} />
            </section>

            {/* Scoreboard */}
            <section className="flex-1/2">
                <TableScore />
            </section>

            {/* Log History */}
            <section className="flex-1/3">
                <BackLog />
            </section>
        </div>

    )
}