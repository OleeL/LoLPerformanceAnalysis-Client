
export interface ActiveSummonersRift {
    redTeam: string[],
    blueTeam: string[]
}
export interface Summoner {
    accountId: string;     // Encrypted account ID. Max length 56 characters.
    profileIconId: number; // ID of the summoner icon associated with the summoner.
    revisionDate: number;  // summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
    name: string;          // Summoner name.
    id: string;            // Encrypted summoner ID. Max length 63 characters.
    puuid: string;         // Encrypted PUUID. Exact length of 78 characters.
    summonerLevel: number; // Summoner level associated with the summoner.
}