import React, { FC } from 'react'
import { GetTileStyle } from '../pages/[region]/[summoner]';
import { useColorStore } from './GlobalStyles';

const MatchHistory: FC = () => {
    const { Selected } = useColorStore();
    const { tile, styles } = GetTileStyle(Selected);
    
    return (
        <article className={tile}>
            {styles}
            <div className="content">
                <p className="title">Match History</p>
                <p className="subtitle">Aligned with the right tile</p>
                <div className="content">
                    Content
                </div>
            </div>
        </article>
    )
}

export default MatchHistory;