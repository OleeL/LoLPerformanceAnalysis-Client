import css from 'styled-jsx/css';
import { IColorScheme, useColorStore } from '../GlobalStyles';
import { useSpring, animated } from 'react-spring';
import { useBurgerStore } from '../spring-components/BurgerButton';
import { useState } from 'react';

const GetBarStyle = (Selected: IColorScheme) => css.resolve`
    div {
        display: flex;
        position: absolute;
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        background-color: ${Selected.primary};
        height: 100%;
        width: 20%;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 5px;
        z-index: 99999;
    }
`

const LeftBar = () => {
    const { Selected } = useColorStore();
    const { pressed } = useBurgerStore();
    const { styles, className } = GetBarStyle(Selected);
    const width = pressed ? `0vw` : `-20vw`;
    const translate = `translate3d(${width},0px,0px)`
    const spring = useSpring({ transform: translate });

    return (
        <animated.div
            style={spring}
            className={className}>
            {styles}
        </animated.div>
    );
}

export default LeftBar;