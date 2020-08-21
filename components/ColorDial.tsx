import { useState, FC } from "react";
import { animated, useSpring } from "react-spring";
import { useColorStore, IColorScheme, Themes } from "./GlobalStyles";
import css from 'styled-jsx/css';
import create from "zustand";

const useColorDialStore = create(set => ({
    pressed: false,
    hovered: false,
    rotation: 0,
    setDialRotation: (r: number) => set({ rotation: r }),
    togglePressed: () => set(s => ({ pressed: !s.pressed })),
    setHovered: (state: boolean) => set(({ hovered: state })),
}));

interface IPress {
    onClick?: () => void;
    cName?: string
}

const GetButtonStyle = (Selected: IColorScheme) => css.resolve`
    div {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 15px;
        top: 15px;
        border-radius: 5px;
        padding: 10px;
        user-select: none;
        align-items: center;
        display: flex;
        justify-content: center;
        align-items: center;

        ${Selected.shadows &&
    `-webkit-box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
        -moz-box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
        box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
        `}
    }

    div:hover {
        background-color: ${Selected.color};
    }

    img {
        pointer-events: none;
    }
`;

const GetDotStyle = (Selected: IColorScheme) => css.resolve`
    div {
        width: 10px;
        height: 10px;
        border-radius: 100px;
        background-color: ${Selected.secondary};
    }
`;

const GetDialStyle = (Selected: IColorScheme) => css.resolve`
    div {
        position: absolute;
        width: 60%;
        height: 40%;
        background-color: ${Selected.secondary};
        clip-path: polygon(50% 0, 50% 0, 66% 100%, 33% 100%);
        transform-origin: bottom center;
        transform: translate(0%, -50%);
    }
`;

const DrawButton: FC<IPress> = ({ onClick, cName }) => {
    const [active, setActive] = useState(false);
    const Selected = useColorStore(state => state.Selected);
    const Toggle = useColorStore.getState().Toggle;
    const { className, styles } = GetButtonStyle(Selected);
    const setDialRotation = useColorDialStore.getState().setDialRotation;

    const spring = useSpring({
        backgroundColor: Selected.primary,
    });

    const Click = () => {
        if (onClick) onClick();
        setDialRotation(useColorDialStore.getState().rotation + (360 / Themes.length));
        setActive(!active);
        Toggle();
    }

    return (
        <animated.div
            onClick={Click}
            style={spring}
            className={className + ` ` + cName}>
            {styles}
            <Icon />
        </animated.div>
    );
}

const Icon = () =>
    <>
        <DrawDot />
        <DrawDial />
    </>

const DrawDial = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetDialStyle(Selected);
    const rotation = useColorDialStore(state => state.rotation);
    const spring = useSpring({
        transform: `translate(0%, -50%) rotate(${rotation}deg)`,
        backgroundColor: Selected.secondary
    });

return (
    <animated.div style={spring} className={className}>
        {styles}
    </animated.div>
)
}

const DrawDot = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetDotStyle(Selected);
    const spring = useSpring({backgroundColor: Selected.secondary});

    return (
        <animated.div style={spring} className={className}>
            {styles}
        </animated.div>
    )
}

export default DrawButton;