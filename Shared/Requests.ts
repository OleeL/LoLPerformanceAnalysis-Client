import { SendRequest } from "./SignalR";
import { ISummoner } from "./GameInterfaces";

export const SendGetSummoner = (summonerName: string, serverRegion: string): Promise<ISummoner> =>
    SendRequest("GetSummoner", [summonerName, serverRegion]);

export const SendGetChampionRotations = (serverRegion): Promise<string> =>
    SendRequest("GetChampionRotations", [serverRegion]);

