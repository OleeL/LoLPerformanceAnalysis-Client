import React, { FC } from 'react'
import { GetTileStyle } from '../../pages/[region]/[summoner]';
import { useColorStore } from './../GlobalStyles';

const MatchHistory: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetTileStyle(Selected);
    
    return (
        <article className={className} style={{width:"700px"}}>
            <div className="content">
                <p className={className+" title"}>Match History</p>
                <p className={className+" subtitle"}>Aligned with the right tile</p>
                <div className={className+" content"}>
                    Content
                </div>
            </div>
            {styles}

        </article>
    )
}

export default MatchHistory;