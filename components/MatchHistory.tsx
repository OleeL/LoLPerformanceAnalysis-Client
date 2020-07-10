import React from 'react'
import { Tile } from '../pages/[region]/[summoner]';

const MatchHistory: React.FC = () => 
    <Tile className="tile is-child notification is-info">
        <p className="title">Match History</p>
        <p className="subtitle">Aligned with the right tile</p>
        <div className="content">
            Content
        </div>
    </Tile>

export default MatchHistory;