import React, { FC } from 'react'
import { GetTileStyle } from '../pages/[region]/[summoner]';
import { useColorStore } from './GlobalStyles';

const TallTile: FC = () => {
    
    const { Selected } = useColorStore();
    const { tile, styles } = GetTileStyle(Selected);
    
    return (
        <article className={tile}>
            <div className="content">
                <p className="title">Tall tile</p>
                <p className="subtitle">With even more content</p>
                <div>
                    Content
                </div>
            </div>
            {styles}
        </article>
    )
}

export default TallTile