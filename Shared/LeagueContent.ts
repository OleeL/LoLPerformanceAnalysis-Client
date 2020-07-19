import { getLeagueType, LeagueType, ISummoner } from "./GameInterfaces";

const capitalize = (str: string) => str?.charAt(0)?.toUpperCase() + str?.toLowerCase().slice(1);

const DPPREFIX             = "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/";
const DEFAULTPROFILEPIC    = "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/0.png";
const PNG                  = ".png";

const SPECIALRANKCASES     = ["CHALLENGER", "MASTER", "GRANDMASTER"];
const SPECIALRANKURLPREFIX = "/data/base-icons/";
const UNRANKEDPICTURE      = "/data/base-icons/provisional.png";
const RANKURLPREFIX        = "/data/tier-icons/"

export const Servers = ["EUW",
    "EUNE",
    "NA",
    "BR",
    "JA",
    "KR",
    "LAS",
    "LAN",
    "OC",
    "TU",
    "RU"]

export interface IRank {
    imagePath: string,
    rankText: string,
    lp: number,
    wins: number,
    losses: number
}

export const GetSummonerIcon = (summoner: ISummoner): string => {
    if (!summoner?.profileIconId || summoner?.profileIconId === undefined ) return DEFAULTPROFILEPIC;
    return DPPREFIX + summoner?.profileIconId + PNG;
}

export const GetRankData = (summoner: ISummoner, lType: LeagueType): IRank => {

    const rank = summoner
        ?.leagueEntry
        .find(type => getLeagueType(type.queueType) === lType);

    if (!rank) return {
        imagePath: UNRANKEDPICTURE,
        rankText: "Unranked",
        lp: 0,
        wins: 0,
        losses: 0
    };

    if (SPECIALRANKCASES.includes(rank?.tier)) return {
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

export const BlankRankedData = {
    imagePath: UNRANKEDPICTURE,
    rankText: "Unranked",
    lp: 0,
    wins: 0,
    losses: 0
}