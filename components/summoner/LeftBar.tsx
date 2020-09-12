import css from 'styled-jsx/css';
import { IColorScheme, useColorStore } from '../GlobalStyles';
import { useSpring, animated } from 'react-spring';
import { useBurgerStore } from '../Buttons/BurgerButton';
import React from 'react';
import SidePanelButton from '../Buttons/SidePanelButton';

const GetBarStyle = (Selected: IColorScheme) => css.resolve`
    div {
        display: flex;
        flex-direction: column;
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
        height: 100%;
        width: 20%;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }
`

interface IButton {
    name: string;
    onClick: () => void;
}

const Buttons: IButton[] = [
    {
        name: "Home",
        onClick: () => { }
    },
    {
        name: "Analytics",
        onClick: () => { }
    },
    {
        name: "Settings",
        onClick: () => { }
    },
    {
        name: "Change Theme",
        onClick: useColorStore.getState().Toggle
    },
    {
        name: "About",
        onClick: () => { }
    }
]

const DrawButtons = () =>
    <div>
        {
            Buttons.map((value, index) =>
                <SidePanelButton key={index} onClick={value.onClick}>
                    {value.name}
                </SidePanelButton>
            )
        }
        <style jsx>{`
            div {
                position: relative;
                left: 10%;
                text-align: center;
            }
        `}
        </style>
    </div>

const LeftBar = () => {
    const Selected = useColorStore(state => state.Selected);
    const pressed = useBurgerStore(state => state.pressed);
    const { styles, className } = GetBarStyle(Selected);
    const width = pressed ? `0vw` : `-20vw`;
    const translate = `translate3d(${width},0px,0px)`
    const spring = useSpring({ transform: translate });

    return (
        <animated.div
            style={spring}
            className={className}>
            <DrawButtons />
            {styles}
        </animated.div>
    );
}

const ShadowBox = () => {
    const pressed = useBurgerStore(state => state.pressed);
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