import React, { useState } from 'react'
import { useStore } from '../Shared/StoreContext';
import { TStore } from '../Shared/Store';
import styled from 'styled-components';
import { Tile } from '../pages/[region]/[summoner]';

const Highlight = styled.div`
    ${props => props.hover ? `-webkit-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
    ${props => props.hover ? `-moz-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
    ${props => props.hover ? `box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);` : ``}
`

const StatisticsTile: React.FC = () => {

    const store: TStore = useStore();
    
    const [hover, setHover] = useState(false);

    return (
        <Tile className="tile is-child notification is-info">
            <p className="title" style={{margin: "0px"}}>Elo tracker</p>
            <Highlight 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                hover={hover}
            >
                <p className="subtitle">Solo duo</p>
                <figure className="image is-4by3">
                    {/* 640x480 */}
                    <img src="https://66.media.tumblr.com/65e180b67bb50a65b1d90748340085ff/tumblr_inline_p7lffkdTLc1srua81_640.png" />
                </figure>
            </Highlight>
        </Tile>
    )
}

export default StatisticsTile