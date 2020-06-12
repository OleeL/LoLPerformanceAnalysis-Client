import { useRouter } from 'next/router'
import React, { useState, useEffect, FormEvent } from "react";
import styled from 'styled-components';
import { useStore } from "../../Shared/StoreContext";
import { SendGetSummoner } from '../../Shared/Requests';
import { TStore } from '../../Shared/Store';
import { useObserver } from 'mobx-react-lite';
import pageloader from '../../node_modules/bulma-pageloader/dist/css/'

const Tiles = styled.div`
    padding: 20px;
`

const StringListToString = (str: string | string[]): string => {
    let answer = "";
    if (typeof(str) === "string") {
        answer = str;
    }
    return answer;
}

const GetSummoner = async (store: TStore, summoner: string, region: string) => {
    const results = await SendGetSummoner(summoner, region);
    store.setSummoner(results, region);
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

        const strRegion = newRegion;
        const strSummoner = newSummoner;
        const level = store.summoner?.summonerLevel;
        const connected = store.connected;
        
        return (
            <Tiles className="tile is-ancestor">
                <div className={`pageloader ${connected ? `` : `is-active`}`}><span className="title">Getting Summoner Data...</span></div>
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-primary">
                                <p className="title">({strRegion}) {strSummoner}</p>
                                <p className="subtitle">Level: {level}</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                                <p className="title">...tiles</p>
                                <p className="subtitle">Bottom tile</p>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-info">
                                <p className="title">Middle tile</p>
                                <p className="subtitle">With an image</p>
                                <figure className="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/640x480.png" />
                                </figure>
                            </article>
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
        );
    });
};

export default Summoner
