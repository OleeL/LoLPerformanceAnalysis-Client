import { SendRequest } from "./SignalR";

export const GetSummonerData = (summonerName: string, serverRegion: string): Promise<string> =>
    SendRequest("GetSummonerName", [summonerName, serverRegion]);

export const GetChampionRotations = (serverRegion): Promise<string> =>
    SendRequest("GetChampionRotations", [serverRegion]);

