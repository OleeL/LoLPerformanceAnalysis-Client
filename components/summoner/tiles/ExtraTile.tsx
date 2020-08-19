import React, { FC } from 'react'
import { GetTileStyle } from '../../../pages/[region]/[summoner]';
import { useColorStore } from '../../GlobalStyles';

const ExtraTile: FC = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetTileStyle(Selected);
    return (
        <article className={className}>
            <div className={"content"} style={{width:"450px"}} >
                {styles}
                <p className={className+" title"}>...tiles</p><br />
                <p className={className+" subtitle"}>Bottom tile</p>
            </div>
        </article>
    );
}

export default ExtraTile