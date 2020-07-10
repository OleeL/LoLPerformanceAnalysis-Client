import React from 'react'
import { Tile } from '../pages/[region]/[summoner]';

const TallTile: React.FC = () => 
    <Tile className="tile is-child notification is-info">
        <div className="content">
            <p className="title">Tall tile</p>
            <p className="subtitle">With even more content</p>
            <div className="content">
                Content
            </div>
        </div>
    </Tile>
export default TallTile