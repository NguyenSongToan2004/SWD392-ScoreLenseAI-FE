import TeamCard from './TeamCard'
import { matchSetUpStore } from "../homeStore"
import type { TeamConfig } from '../models/DataObject';

const TeamList = () => {
    const matchSetUp = matchSetUpStore.use();
    const teamConfig: TeamConfig[] = matchSetUp.teamConfigs;
    return (
        // THAY ĐỔI: flex-col trên mobile, md:flex-row trên desktop.
        <div className='mt-5 w-full flex-1 flex flex-col md:flex-row justify-center gap-4 md:gap-10'>
            {teamConfig.map((team, index) =>
                <TeamCard teamName={team.name} memberName={team.memberNames} orderTeam={index} key={index} />
            )}
        </div>
    )
}

export default TeamList;