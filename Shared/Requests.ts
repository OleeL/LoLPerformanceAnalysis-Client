import { SendRequest } from "./SignalR";

const GetSummonerData = async (summonerName: string, serverRegion: string): Promise<string> => SendRequest("GetSummonerName", [summonerName, serverRegion]);

export default GetSummonerData;