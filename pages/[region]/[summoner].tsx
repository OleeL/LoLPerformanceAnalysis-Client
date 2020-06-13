import { useRouter } from 'next/router'
import React, { useState, useEffect, FormEvent, Suspense } from "react";
import styled from 'styled-components';
import { useStore } from "../../Shared/StoreContext";
import { SendGetSummoner } from '../../Shared/Requests';
import { TStore } from '../../Shared/Store';
import { useObserver } from 'mobx-react-lite';

const SummonerIconSize = 60;

const Tiles = styled.div`
    padding: 20px;
`

const Tile = styled.article`
    -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
`

const Image = styled.img`
    position: absolute;
    
    width: ${SummonerIconSize}px;
    height: ${SummonerIconSize}px;

    right: 0;
    top: 0;
    bottom: 0;

    border-radius: 12px;
`

const PlayerTile = styled.article`
    padding: 20px;
    
    -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
`

const Player = styled.div`
    padding: 0px ${SummonerIconSize+10}px 0px 0px;
    position: relative;
`

const Highlight = styled.div`
    ${props => props.hover ? `-webkit-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
    ${props => props.hover ? `-moz-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
    ${props => props.hover ? `box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
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
}

const Summoner = () => {

    const store = useStore();
    const router = useRouter();
    const { region, summoner } = router.query;
    
    const [hover, setHover] = useState(false);
    
    const newRegion   = StringListToString(region).toUpperCase();
    const newSummoner = StringListToString(summoner);
    
    useEffect(() => {
        if (store.summoner || !store.connected) return;
        GetSummoner(store, newSummoner, newRegion);

    }, [store.connected]);

    return useObserver(() => {

        const strRegion = newRegion;
        const strSummoner = newSummoner;
        const summonerLevel = store.summoner?.summonerLevel;
        const profileIconId = store.summoner?.profileIconId;
        const connected = store.connected;

        if (connected && !store.summoner) return <>Couldn't find summoner</>
        
        return (
            <>
                <div className={`pageloader ${connected ? ``: `is-active`}`}><span className="title">Getting Summoner Data...</span></div>
                <Tiles className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <PlayerTile className="tile is-child notification is-primary">
                                    <Player>
                                        <p className="title">{strSummoner}</p>
                                        <p className="subtitle">({strRegion}) Level: {summonerLevel}</p>
                                        <Image src={`http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/${profileIconId}.png`} />
                                    </Player>
                                </PlayerTile>
                                <Tile className="tile is-child notification is-warning">
                                    <p className="title">...tiles</p>
                                    <p className="subtitle">Bottom tile</p>
                                </Tile>
                            </div>
                            <div className="tile is-parent">
                                <Tile className="tile is-child notification is-info">
                                    <p className="title" style={{margin: "0px"}}>Elo tracker</p>
                                    <Highlight 
                                        onMouseEnter={() => setHover(true)}
                                        onMouseLeave={() => setHover(false)}
                                        hover={hover}
                                    >
                                        <p className="subtitle">Solo duo</p>
                                        <figure className="image is-4by3">
                                            <img src="https://bulma.io/images/placeholders/640x480.png" />
                                        </figure>
                                    </Highlight>
                                </Tile>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-danger">
                                <p className="title">Wide tile</p>
                                <p className="subtitle">Aligned with the right tile</p>
                                <div className="content">
                                    Content
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-success">
                            <div className="content">
                                <p className="title">Tall tile</p>
                                <p className="subtitle">With even more content</p>
                                <div className="content">
                                    Content
                                </div>
                            </div>
                        </article>
                    </div>
                </Tiles>
            </>
        );
    });
};

export default Summoner
