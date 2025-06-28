import CustomInput from "./CustomInput ";
import "../home.css"
import { matchSetUpStore } from "../homeStore";

interface TeamCardProps {
    teamName: string;
    memberName: string[]; // Mảng các thành viên
    orderTeam: number;
}

const TeamCard = ({ teamName, memberName, orderTeam }: TeamCardProps) => {

    const handleSave = (newLabel: string, type: "TEAM" | "PLAYER", order: number | null) => {
        if (type === "TEAM") {
            matchSetUpStore.set((prev) => {
                prev.value.teamConfigs[orderTeam].name = newLabel;
            })
        }
        else {
            matchSetUpStore.set((prev) => {
                prev.value.teamConfigs[orderTeam].memberNames[order ?? 0] = newLabel;
            })
        }
    };

    return (
        <div className="flex-1 flex flex-col py-0 md:py-2 px-2 border-0 bg-white rounded-lg shadow-md">
            {/* Team Name */}
            <CustomInput initialLabel={teamName} onSave={handleSave} type="TEAM" order={null} />
            {/* Separator */}
            <div className="border-b green"></div>
            {/* Player Name */}
            {memberName.map((mem, index) =>
                <CustomInput initialLabel={mem} onSave={handleSave} type="PLAYER" key={index} order={index} />
            )}
        </div>
    );
};

export default TeamCard;
