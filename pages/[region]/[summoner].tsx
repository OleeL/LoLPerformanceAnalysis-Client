import { useRouter } from 'next/router'
import React, { useState, useEffect, FormEvent, Suspense } from "react";
import styled from 'styled-components';
import { useStore } from "../../Shared/StoreContext";
import { SendGetSummoner } from '../../Shared/Requests';
import { TStore } from '../../Shared/Store';
import { useObserver } from 'mobx-react-lite';
import SummonerDetails from '../../components/SummonerTile';
import ExtraTile from '../../components/ExtraTile';
import StatisticsTile from '../../components/StatisticsTile';
import TallTile from '../../components/TallTile';
import MatchHistory from '../../components/MatchHistory';

const Tiles = styled.div`
    padding: 64px 20px 20px 20px;
`

export const Tile = styled.article`
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);

`

const StringListToString = (str: string | string[]): string => {
    let answer = "";
    if (typeof(str) === "string") {
        answer = str;
    }
    return answer;
}

const GetSummoner = async (store: TStore, summoner: string, region: string) => {
    
    store.setReceivedData(false)
    const results = await SendGetSummoner(summoner, region);
    store.setSummoner(results, region);
    console.log(store.summoner);
}

const Summoner = () => {

    const store = useStore();
    const router = useRouter();
    const { region, summoner } = router.query;
    
    const newRegion   = StringListToString(region).toUpperCase();
    const newSummoner = StringListToString(summoner);
    
    useEffect(() => {
        if (store.summoner || !store.connected) return;
        GetSummoner(store, newSummoner, newRegion);

    }, [store.connected]);

    return useObserver(() => {

        const {connected, receivedData} = store;

        if (connected && !store.summoner && store.receivedData) return <>Couldn't find summoner</>
        
        return (
            <>
                <div className={`pageloader ${connected && receivedData ? ``: `is-active`}`}><span className="title">Getting Summoner Data...</span></div>
                <Tiles className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <SummonerDetails />
                                <ExtraTile />
                            </div>
                            <div className="tile is-parent">
                                <StatisticsTile />
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <MatchHistory />
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <TallTile />
                    </div>
                </Tiles>
            </>
        );
    });
};

export default Summoner
