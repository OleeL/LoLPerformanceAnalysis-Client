import React, { FC } from 'react'
import { Tile } from '../pages/[region]/[summoner]';

const TallTile: FC = () => 
    <article className="tile is-child notification is-info">
        <div className="content">
            <p className="title">Tall tile</p>
            <p className="subtitle">With even more content</p>
            <div className="content">
                Content
            </div>
        </div>
        <style jsx>{Tile}</style>
    </article>

export default TallTile