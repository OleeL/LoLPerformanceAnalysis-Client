import { useRouter } from 'next/router'
import { SendGetSummoner } from '../../Shared/Requests';
import { useStore } from '../../Shared/Store';
import { ISummoner } from '../../Shared/GameInterfaces';
import { IColorScheme } from '../../components/GlobalStyles';
import React, { useEffect, FC } from "react";
import SummonerDetails from '../../components/summoner/tiles/SummonerTile';
import ExtraTile from '../../components/summoner/tiles/ExtraTile';
import StatisticsTile from '../../components/summoner/tiles/StatisticsTile';
import TallTile from '../../components/summoner/tiles/TallTile';
import MatchHistory from '../../components/summoner/tiles/MatchHistory';
import TopBar from '../../components/summoner/TopBar';
import css from 'styled-jsx/css';

export const GetTileStyle = (p: IColorScheme) => css.resolve`
    article {
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        margin: 10px 5px 10px 5px;
        border-radius: 5px;
        background-color: ${p.primary};
        padding: 20px;
        color: white;
        flex-grow: 1;
    }

    p {
        color: white;
        display: block;
    }
`

const Content = css`
    div {
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 5px;
        top: 70px;
        width: 100%;
        flex-wrap: wrap;
    }
`

const StringListToString = (str: string | string[]): string =>
    typeof(str) === "string" ? str : "";

const GetSummoner = async (
    setReceivedData: (status: boolean) => void,
    setSummoner: (results: ISummoner, region: string) => void,
    summoner: string,
    region: string) => {
    
    setReceivedData(false)
    const summonerResults: ISummoner = await SendGetSummoner(summoner, region);
    if (summonerResults) {
        setSummoner(summonerResults, region);
        return;
    }

    window.location.href = "/"
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
    const showPageLoader  = !connected || !receivedData;
    const pLoaderInactive = `pageloader`;
    const pLoaderActive   = `pageloader is-active`;

    useEffect(() => {
        if (summoner || !connected) return;
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
        <>
            <SummonerData />
            <TopBar />
            <div>
                <SummonerDetails />
                <ExtraTile />
                <StatisticsTile />
                <MatchHistory />
                <TallTile />
                <style jsx>{Content}</style>
            </div>
        </>
    );
}

export default Summoner
