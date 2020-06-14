
export interface ActiveSummonersRift {
    redTeam: string[],
    blueTeam: string[]
}
export interface ISummoner {
    accountId: string;     // Encrypted account ID. Max length 56 characters.
    profileIconId: number; // ID of the summoner icon associated with the summoner.
    revisionDate: number;  // summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
    name: string;          // Summoner name.
    id: string;            // Encrypted summoner ID. Max length 63 characters.
    puuid: string;         // Encrypted PUUID. Exact length of 78 characters.
    summonerLevel: number; // Summoner level associated with the summoner.
    
    leagueEntry?: LeagueEntryDTO[];
}

export interface MiniSeriesDTO {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export interface LeagueEntryDTO {
    leagueId: string;
    summonerId: string;   // Player's encrypted summonerId.
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;         // Winning team on Summoners Rift.
    losses: number;       // Losing team on Summoners Rift.
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    miniSeries?: MiniSeriesDTO;
}

export const getLeagueType = (leagueType: string): LeagueType => {
    switch (leagueType) {
        case "RANKED_SOLO_5x5": return LeagueType.SOLO_DUO;
        case "RANKED_FLEX_SR":  return LeagueType.FLEX;
        default:                return LeagueType.UNRANKED;
    }
}

export enum LeagueType {
    SOLO_DUO,
    FLEX,
    UNRANKED
}