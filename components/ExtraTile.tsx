import React, { FC } from 'react'
import { GetTileStyle } from '../pages/[region]/[summoner]';
import { useColorStore } from './GlobalStyles';

const ExtraTile: FC = () => {
    const { Selected } = useColorStore();
    const { tile, styles } = GetTileStyle(Selected);
    return (
        <article className={tile}>
            <div className="content">
                <p className="title">...tiles</p><br />
                <p className="subtitle">Bottom tile</p>
            </div>
            {styles}
        </article>
    );
}

export default ExtraTile