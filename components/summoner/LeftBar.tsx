import css from 'styled-jsx/css';
import { IColorScheme, useColorStore } from '../GlobalStyles';
import { useSpring, animated, AnimatedValue } from 'react-spring';
import { useBurgerStore } from '../spring-components/BurgerButton';
import React, { useState, FC } from 'react';

const GetBarStyle = (Selected: IColorScheme) => css.resolve`
    div {
        display: flex;
        position: fixed;
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

const GetShadow = () => css.resolve`
    div {
        display: flex;
        position: fixed;
        background-color: rgba(0,0,0,0);
        height: 100%;
        width: 20%;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 5px;
        z-index: -1;
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

const ShadowBox: FC = () => {
    const { pressed } = useBurgerStore();
    const width = pressed ? `0vw` : `-20vw`;
    const translate = `translate3d(${width},0px,0px)`
    const shadow = pressed ? `0px 0px 15px -1px rgba(0,0,0,0.5)`
        : `0px 0px 15px -1px rgba(0,0,0,0.0)`;
    const spring = useSpring({ transform: translate, boxShadow: shadow });
    const { className, styles } = GetShadow();

    return (
        <animated.div
            className={className}
            style={spring}>
            {styles}
        </animated.div>
    )
}

const index = () =>
    <div>
        <LeftBar />
        <ShadowBox />
    </div>


export default index;