import { FC } from "react";
import { useColorStore, IColorScheme } from "../GlobalStyles";
import css from 'styled-jsx/css';
import create from "zustand";
import { useSpring, animated, SpringConfig } from 'react-spring';

export const [getStore] = create(set => ({
    pressed: false,
    hovered: false,
    togglePressed: () => set(s => ({ pressed: !s.pressed })),
    setHovered: (state: boolean) => set(({ hovered: state })),
}));

const springConfig: SpringConfig = {
    tension: 400,
    friction: 50
}

const margin = {
    small: "3px 0px 3px 0px",
    large: "6px 0px 6px 0px"
}

const GetCollectionStyle = (Selected: IColorScheme) => css.resolve`
    a {
        margin: 5px;
    }
`;

const GetLineStyle = () => css.resolve`
    div {
        margin: 6px 0px 6px 0px;
        border-radius: 12px;
        width: 32px;
        height: 4px;
    }
`;

const BurgerButton: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetCollectionStyle(Selected);
    const { togglePressed, setHovered } = getStore();

    const Click = () => togglePressed();
    const Hover = (e) => setHovered(true);
    const Unhover = (e) => setHovered(false);

    return (
        <a
            onClick={Click}
            className={className}
            onMouseEnter={Hover}
            onMouseLeave={Unhover}>
            <Top />
            <Middle />
            <Bottom />
            {styles}
        </a>
    );
}

const GetRotRight = (hovered: boolean): string => hovered ? `45deg` : `0deg`;
const GetRotLeft = (hovered: boolean): string => hovered ? `-45deg` : `0deg`;
const GetTranslationLeftBottom = (hovered: boolean): string =>
    hovered ? `18px,-5.5px,0px` : `0px,0px,0px`
const GetTranslationRightBottom = (hovered: boolean): string =>
    hovered ? `-2px,-5.5px,0px` : `0px,0px,0px`
const GetTranslationLeftTop = (hovered: boolean): string =>
    hovered ? `-2px,5.5px,0px` : `0px,0px,0px`
const GetTranslationRightTop = (hovered: boolean): string =>
    hovered ? `18px,5.5px,0px` : `0px,0px,0px`

const Top = () => {
    const { Selected } = useColorStore();
    const { hovered, pressed } = getStore();
    const { className, styles } = GetLineStyle();
    const rotation    = pressed ? GetRotLeft(hovered) : GetRotRight(hovered);
    const translation = pressed ? GetTranslationLeftTop(hovered)
        : GetTranslationRightTop(hovered);
    const width       = hovered ? `16px` : `32px`;
    const spring = useSpring(
        {
            backgroundColor: hovered ? Selected.hover : Selected.primaryInverted,
            transform: `translate3d(${translation}) rotate(${rotation})`,
            width: width,
            config: springConfig
        }
    );

    return (
        <animated.div
            style={spring}
            className={className}>
            {styles}
        </animated.div>
    )
}

const Middle = () => {
    const { Selected } = useColorStore();
    const { hovered } = getStore();
    const { className, styles } = GetLineStyle();
    const spring = useSpring({ backgroundColor: hovered ? Selected.hover : Selected.primaryInverted });
    return (
        <animated.div
            style={spring}
            className={className}>
            {styles}
        </animated.div>
    )
}

const Bottom = () => {
    const { Selected } = useColorStore();
    const { hovered, pressed } = getStore();
    const { className, styles } = GetLineStyle();
    const rotation = pressed ? GetRotRight(hovered) : GetRotLeft(hovered);
    const translation = pressed ? GetTranslationRightBottom(hovered)
        : GetTranslationLeftBottom(hovered);
    const width       = hovered ? `16px` : `32px`;
    const spring = useSpring({
        backgroundColor: hovered ? Selected.hover : Selected.primaryInverted,
        transform: `translate3d(${translation}) rotate(${rotation})`,
        width: width,
        config: springConfig
    });

    return (
        <animated.div
            style={spring}
            className={className}>
            {styles}
        </animated.div>
    )
}
export default BurgerButton;