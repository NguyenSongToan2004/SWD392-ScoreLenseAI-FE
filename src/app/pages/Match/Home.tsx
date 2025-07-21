import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useStomp } from "../../hooks/useStomp";
import { useSubscription } from "../../hooks/useSubscription";
import { type BilliardMatch } from "../../models/DataObject";
import BackLog from "./partials/BackLog";
import GameResultPopup from "./partials/GameResultPopup";
import Header from "./partials/Header";
import TableScore from "./partials/TableScore";
import { fetchMatchAPI, setManualAPI, updateScoreAPI } from "./services/FetchAPI";
import type { Loggoing } from "./models/WebSocketModel";

// --- Components Placeholder ---
const LoadingComponent = () => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-white text-2xl p-4 text-center">
        Loading match data...
    </div>
);

const ErrorComponent = ({ message }: { message: string }) => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-red-400 text-2xl p-4 text-center">
        Error: {message}
    </div>
);

interface MatchSocketPayload {
    code: "WINNING_MATCH" | "WINNING_SET",
    data: string;
}

export default function Match() {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [showPopup, setShowPopup] = useState(false);

    const [match, setMatch] = useState<BilliardMatch | null>(location.state?.match ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(!match);
    const [error, setError] = useState<string | null>(null);
    const { client, isConnected } = useStomp();

    const handleMatchUpdate = useCallback((payload: MatchSocketPayload) => {
        console.log('Received match update:', payload);
        if (payload.code === "WINNING_SET") {
            const reFetchMatch = async () => {
                setIsLoading(true);
                const response = await fetchMatchAPI(id as string);
                if (response.status === 200) {
                    setMatch(response.data);
                } else {
                    setError(response.message || 'Failed to fetch match details.');
                }
                setIsLoading(false);
            }
            reFetchMatch();
        } else {
            setShowPopup(true);
        }
    }, []);

    const handleManualMode = async () => {
        if (match != null) {
            const response = await setManualAPI(match.billiardMatchID);
            if (response.status === 200) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    }

    const handleNewLog = useCallback((logMessage: Loggoing) => {
        console.log('Received new log:', logMessage);
        switch (logMessage.code) {
            case "NOTIFICATION":
                toast.info(logMessage.data);
                break;
            case "ERROR":
                toast.error(logMessage.data);
                break;
            case "WARNING":
                toast("Camera Connection Failed", {
                    description: "You can select manual mode for all actions",
                    action: {
                        label: "Manual",
                        onClick: () => handleManualMode
                    }
                })
                break;
            case "LOGGING":
                toast.info(logMessage.data);
                break;
            default:
                console.log("❓ Unknown log code:", logMessage.code);
        }
    }, []);

    useSubscription(
        client, 
        isConnected && match !== null, 
        `/topic/match_event/${match?.billiardTableID}`, 
        handleMatchUpdate
    );
    // useSubscription(client, isConnected, `/topic/log/${id}`, handleNewLog);
    useSubscription(client, isConnected, `/topic/notification`, handleNewLog);

    const handleScoreUpdate = (teamID: number, delta: string) => {
        const updateScore = async () => {
            if (match) {
                const response = await updateScoreAPI(match.billiardMatchID, teamID, delta);
                if (response.status === 200) {
                    setMatch(response.data);
                    toast.success(response.message);
                }
            } else {
                toast.error('Match not found');
            }
        }
        updateScore();
    };

    useEffect(() => {
        if (match && match.billiardMatchID.toString() === id) {
            setIsLoading(false);
            return;
        }
        const getMatch = async () => {
            if (!id) {
                setError("Match ID is missing from URL.");
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            const response = await fetchMatchAPI(id);
            if (response.status === 200) {
                setMatch(response.data);
            } else {
                setError(response.message || 'Failed to fetch match details.');
            }
            setIsLoading(false);
        };

        getMatch();
        if (match?.status === 'completed') {
            setShowPopup(true);
        }
    }, [id, match]);
    
    if (isLoading) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} />;
    if (!match) return <ErrorComponent message="Could not find match data." />;

    return (
        // THAY ĐỔI: Điều chỉnh padding cho mobile
        <div className="w-screen h-screen flex flex-col gap-2 md:gap-5 text-white font-sans p-4 md:p-6 overflow-hidden gradient-bg">

            <section className="flex-initial">
                <Header
                    setArray={match.sets}
                    tableID={`TABLE: ${match.billiardMatchID}`}
                    matchID={match.billiardMatchID}
                    teamID={match.teams[0]?.teamID}
                />
            </section>

            <section className="flex-1 flex items-center justify-center">
                <TableScore
                    teamsArray={match.teams}
                    onScoreChange={handleScoreUpdate}
                />
            </section>

            {/* THAY ĐỔI: Ẩn BackLog trên mobile */}
            <section className="hidden md:block flex-initial overflow-y-hidden">
                <BackLog tableID={match.billiardTableID} />
            </section>

            <section>
                {showPopup &&
                    <GameResultPopup
                        playerArray={match.teams}
                        winner={match.winner || "Hòa"}
                    />}
            </section>
        </div>
    )
}
