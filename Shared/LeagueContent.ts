import { TStore } from "./Store";
import { getLeagueType, LeagueType } from "./GameInterfaces";

const capitalize = (str: string) => str?.charAt(0)?.toUpperCase() + str?.toLowerCase().slice(1);

const DPPREFIX             = "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/";
const DEFAULTPROFILEPIC    = "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/0.png";
const PNG                  = ".png";

const SPECIALRANKCASES     = ["CHALLENGER", "MASTER", "GRANDMASTER"];
const SPECIALRANKURLPREFIX = "/data/base-icons/";
const UNRANKEDPICTURE      = "/data/base-icons/provisional.png";

const RANKURLPREFIX        = "/data/tier-icons/"

export interface IRank {
    imagePath: string,
    rankText: string,
    lp?: number,
    wins?: number,
    losses?: number
}

export const GetSummonerIcon = (store: TStore): string => {
    
    if (!store?.summoner?.profileIconId) return DEFAULTPROFILEPIC;
    return DPPREFIX + store.summoner.profileIconId + PNG;
}

export const GetRankData = (store: TStore, lType: LeagueType): IRank => {

    const rank = store.summoner
        ?.leagueEntry
        .find(type => getLeagueType(type.queueType) === lType);
    
    if (!rank) return {
        imagePath: UNRANKEDPICTURE,
        rankText: "Unranked"
    };

    if (SPECIALRANKCASES.includes(rank?.tier)) 
        return {
            imagePath: (SPECIALRANKURLPREFIX + rank.tier + PNG).toLowerCase(), 
            rankText: capitalize(rank.tier),
            lp: rank.leaguePoints,
            wins: rank.wins,
            losses: rank.losses
        };

    return {
        imagePath: RANKURLPREFIX 
            + rank.tier
            + "_"
            + rank.rank
            + PNG,
        rankText: capitalize(rank.tier) + " " + rank.rank,
        lp: rank.leaguePoints,
        wins: rank.wins,
        losses: rank.losses
    }
}