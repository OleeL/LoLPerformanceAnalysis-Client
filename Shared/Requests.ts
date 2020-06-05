import { SendRequest } from "./SignalR";

export const GetSummonerData = async (summonerName: string, serverRegion: string): Promise<string> => SendRequest("GetSummonerName", [summonerName, serverRegion]);

export const GetChampionRotations = async (): Promise<string> => SendRequest("GetChampionRotations", ["euw1"]);