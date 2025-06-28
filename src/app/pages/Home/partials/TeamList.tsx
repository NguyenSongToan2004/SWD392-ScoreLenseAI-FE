import TeamCard from './TeamCard'
import { matchSetUpStore } from "../homeStore"
import type { TeamConfig } from '../models/DataObject';
const TeamList = () => {
    const matchSetUp = matchSetUpStore.use();
    const teamConfig: TeamConfig[] = matchSetUp.teamConfigs;
    return (
        <div className='mt-5 flex-1 flex flex-row justify-center gap-10'>
            {teamConfig.map((team, index) =>
                <TeamCard teamName={team.name} memberName={team.memberNames} orderTeam={index} key={index}/>
            )}
        </div>
    )
}

export default TeamList
