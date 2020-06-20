import React from 'react'
import { useStore } from '../Shared/StoreContext';
import styled from 'styled-components'
import { Tile } from '../pages/[region]/[summoner]';
import { TStore } from '../Shared/Store';
import { LeagueType, getLeagueType } from '../Shared/GameInterfaces';
import { GetSummonerIcon, GetRankData, IRank } from '../Shared/LeagueContent';
import TopBar from './TopBar';

const ExtraTile: React.FC = () => {

    const store: TStore = useStore();

    return (
        <Tile className="tile is-child notification is-info">
            <p className="title">...tiles</p><br />
            <p className="subtitle">Bottom tile</p>
        </Tile>
    );
}

export default ExtraTile