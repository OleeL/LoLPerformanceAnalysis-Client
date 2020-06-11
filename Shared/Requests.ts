import { SendRequest } from "./SignalR";
import { Summoner } from "./GameInterfaces";

export const SendGetSummoner = (summonerName: string, serverRegion: string): Promise<Summoner> =>
    SendRequest("GetSummoner", [summonerName, serverRegion]);

export const SendGetChampionRotations = (serverRegion): Promise<string> =>
    SendRequest("GetChampionRotations", [serverRegion]);

