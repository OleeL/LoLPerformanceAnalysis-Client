import React, { FC } from 'react'
import { GetTileStyle } from '../pages/[region]/[summoner]';
import { useColorStore } from './GlobalStyles';

const TallTile: FC = () => {
    
    const { Selected } = useColorStore();
    const { className, styles } = GetTileStyle(Selected);
    
    return (
        <article className={className}>
            <div className="content">
                <p className={className+" title"}>Tall tile</p>
                <p className={className+" subtitle"}>With even more content</p>
                <div>
                    Content
                </div>
            </div>
            {styles}
        </article>
    )
}

export default TallTile