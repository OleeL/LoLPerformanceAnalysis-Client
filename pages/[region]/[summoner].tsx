import { useRouter } from 'next/router'
import { SendGetSummoner } from '../../Shared/Requests';
import { useStore } from '../../Shared/Store';
import { ISummoner } from '../../Shared/GameInterfaces';
import { IColorScheme, useColorStore } from '../../components/GlobalStyles';
import React, { useEffect, FC } from "react";
import SummonerDetails from '../../components/summoner/tiles/SummonerTile';
import ExtraTile from '../../components/summoner/tiles/ExtraTile';
import StatisticsTile from '../../components/summoner/tiles/StatisticsTile';
import TallTile from '../../components/summoner/tiles/TallTile';
import MatchHistory from '../../components/summoner/tiles/MatchHistory';
import TopBar from '../../components/summoner/TopBar';
import css from 'styled-jsx/css';
import LeftBar from '../../components/summoner/LeftBar';
import { useSpring, animated } from 'react-spring';
import { useBurgerStore } from '../../components/Buttons/BurgerButton';

export const GetTileStyle = (p: IColorScheme) => css.resolve`
    article {
        ${p.shadows && `box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5)`};
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

const GetPageStyles = (Selected: IColorScheme) => css.resolve`
    div {
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;

        ${Selected.shadows &&
        `-webkit-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        -moz-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        `}
    }
`;


const ContentStyle = css`
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

const Screen = css`
    div {
        position: relative;
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

    const summoner = useStore(state => state.summoner);
    const connected = useStore(state => state.connected);
    const setReceivedData = useStore(state => state.setReceivedData);
    const setSummoner = useStore(state => state.setSummoner);
    const receivedData = useStore(state => state.receivedData);

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

const CenterContent = () =>
    <div>
        <SummonerDetails />
        <ExtraTile />
        <StatisticsTile />
        <MatchHistory />
        <TallTile />
        <style jsx>{ContentStyle}</style>
    </div>

const Content: FC = () => {
    const pressed = useBurgerStore(state => state.pressed);
    const left = pressed ? `20%` : `0%`;
    const spring = useSpring({paddingLeft: left});
    return (
        <>
            <SummonerData />
            <LeftBar />
            <TopBar />
            <animated.div style={spring}>
                <CenterContent />
                <style jsx>{Screen}</style>
            </animated.div>
        </>
    );
}

const Summoner = () => {
    const { Selected } = useColorStore();
    const {styles, className} = GetPageStyles(Selected) ;

    const spring = useSpring({
        backgroundColor: Selected.backgroundColor,
        color: Selected.color
    });

    return (
        <animated.div style={spring} className={className}>
            <Content />
            {styles}
        </animated.div>
    )
}

export default Summoner
