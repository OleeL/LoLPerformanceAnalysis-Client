import { useRouter } from 'next/router'
import React, { useEffect, FC } from "react";
import { SendGetSummoner } from '../../Shared/Requests';
import { useStore } from '../../Shared/Store';
import { ISummoner } from '../../Shared/GameInterfaces';
import { useColorStore, IColorScheme } from '../../components/GlobalStyles';
import SummonerDetails from '../../components/SummonerTile';
import ExtraTile from '../../components/ExtraTile';
import StatisticsTile from '../../components/StatisticsTile';
import TallTile from '../../components/TallTile';
import MatchHistory from '../../components/MatchHistory';
import TopBar from '../../components/TopBar';
import css from 'styled-jsx/css';

export const GetTileStyle = (p: IColorScheme) => css.resolve`
    article {
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        margin: 10px 5px 10px 5px;
        border-radius: 5px;
        background-color: ${p.primary}};
        padding: 20px;
        color: white;
    }

    p {
        color: white;
        display: block;
    }
`

const Content = css`
    div {
        position: relative;
        padding: 5px;
        top: 70px;
    }
`

const StringListToString = (str: string | string[]): string => {
    let answer = "";
    if (typeof(str) === "string") {
        answer = str;
    }
    return answer;
}

const GetSummoner = async (
    setReceivedData: (status: boolean) => void,
    setSummoner: (results: ISummoner, region: string) => void,
    summoner: string,
    region: string) => {
    
    setReceivedData(false)
    const results = await SendGetSummoner(summoner, region);
    setSummoner(results, region);
}

const SummonerData = () => {

    const { summoner,
        connected,
        setReceivedData,
        setSummoner,
        receivedData }    = useStore();

    const router          = useRouter();
    const { region }      = router.query;
    const rSummonerName   = router.query.summoner;
    
    const newRegion       = StringListToString(region).toUpperCase();
    const newSummoner     = StringListToString(rSummonerName);
    const showPageLoader  = !connected && !receivedData;
    const pLoaderInactive = `pageloader`;
    const pLoaderActive   = `pageloader is-active`;

    
    useEffect(() => {
        if (summoner || !connected) return;
        console.log("summoner");
        GetSummoner(setReceivedData, setSummoner, newSummoner, newRegion);
    }, [connected]);

    if (connected && !summoner && receivedData) return <>Couldn't find summoner</>

    return (
        <div className={showPageLoader ? pLoaderActive : pLoaderInactive}>
            <span className="title">Getting Summoner Data...</span>
        </div>
    )
};

const Summoner: FC = () => {
    return (
        <div>
            <SummonerData />
            <TopBar />
            <SummonerDetails />
            <ExtraTile />
            <StatisticsTile />
            <MatchHistory />
            <TallTile />
            <style jsx>{Content}</style>
        </div>
    );
}

export default Summoner
