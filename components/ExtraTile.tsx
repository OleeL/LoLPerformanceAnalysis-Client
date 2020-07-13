import React from 'react'
import { Tile } from '../pages/[region]/[summoner]';

const ExtraTile: React.FC = () => {

    return (
        <article className="tile is-child notification is-info">
            <p className="title">...tiles</p><br />
            <p className="subtitle">Bottom tile</p>
            <style jsx>{Tile}</style>
        </article>
    );
}

export default ExtraTile