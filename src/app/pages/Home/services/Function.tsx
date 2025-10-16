import type { MatchSetup, TeamConfig } from "../models/DataObject"

export const setDefaultMatchSetUp = (): MatchSetup => {
    let creatorID = localStorage.getItem('customerID');

    const matchSetUp: MatchSetup = {
        billiardTableID: "1",
        modeID: null,
        customerID: creatorID,
        setUp: "1vs1",
        totalSet: 1,
        raceTo: 3,
        teamConfigs: []
    };

    return matchSetUp;
}

export const setDefaultTeamConfig = (type: "1 VS 1" | "2 VS 2" | "SCOTCH DOUBLE" | "RESET"): TeamConfig[] => {
    const teamConfig: TeamConfig[] = [];
    if (type === "1 VS 1") {
        teamConfig.push(
            {
                name: "TEAM A",
                totalMember: 1,
                memberNames: ["Player1"]
            },
            {
                name: "TEAM B",
                totalMember: 1,
                memberNames: ["Player2"]
            }
        )
    } else if (type === "2 VS 2" || type === "SCOTCH DOUBLE") {
        teamConfig.push(
            {
                name: "TEAM A",
                totalMember: 2,
                memberNames: ["PLAYER 1", "PLAYER 2"]
            },
            {
                name: "TEAM B",
                totalMember: 2,
                memberNames: ["Player 3", "PLAYER 4"]
            }
        )
    }
    else if (type === "RESET") {
        teamConfig.push(
        )
    }

    return teamConfig;
}
