import React from 'react'
import { Tile } from '../pages/[region]/[summoner]';

const MatchHistory: React.FC = () => 
    <article className="tile is-child notification is-info">
        <style jsx>{Tile}</style>
        <p className="title">Match History</p>
        <p className="subtitle">Aligned with the right tile</p>
        <div className="content">
            Content
        </div>
    </article>

export default MatchHistory;