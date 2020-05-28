import { LolApi, Constants } from 'twisted';
import { Regions } from 'twisted/dist/constants';
import { API_KEY } from '../pages/Config';

const api = new LolApi({
    key: API_KEY
});

export const getSummonerId = async (name: string, region: string) => {
    return await api.Summoner.getByName(name, region as Regions );
};


export const stringToRegion = (strRegion: string) => {
    console.log(strRegion);
    switch(strRegion)
    {
        case "EUNE": return "EUN1";
        case "EUW": return "EUW1";
        case "LAS": return "LA1";
        case "LAN": return "LA2";
        case "BR": return "BR1";
        case "NA": return "NA1";
        case "OC": return "OC1";
        case "TU": return "TR1";
        case "JA": return "JP1";
        // case "TU": return "PBE";
    }
    return strRegion;
}