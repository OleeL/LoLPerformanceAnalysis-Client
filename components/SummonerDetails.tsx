import React from 'react'
import { useStore } from '../Shared/StoreContext';

const SummonerDetails = () => {
    const store = useStore();

    const {region, summoner} = store;
    return (
        <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-primary">
                <p className="title">({region}) {summoner.name}</p>
                <p className="subtitle">Level: {summoner.summonerLevel}</p>
                <img src={`http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/${summoner.profileIconId}.png`}></img>
            </article>
            <article className="tile is-child notification is-warning">
                <p className="title">...tiles</p>
                <p className="subtitle">Bottom tile</p>
            </article>
        </div>
    );
}

export default SummonerDetails