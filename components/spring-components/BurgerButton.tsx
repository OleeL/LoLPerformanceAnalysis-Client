import { FC } from "react";
import { useColorStore, IColorScheme } from "../GlobalStyles";
import css from 'styled-jsx/css';
import create from "zustand";
import { useSpring, animated } from 'react-spring';

const [getStore] = create(set => ({
    pressed: false,
    hovered: false,
    togglePressed: () => set(s => ({ pressed: !s.pressed })),
    setHovered: (state: boolean) => set(({ hovered: state })),
}));

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

const Top = () => {
    const { Selected } = useColorStore();
    const { hovered } = getStore();
    const { className, styles } = GetLineStyle();
    const rotation    = hovered ? `45deg` : `0deg`;
    const translation = hovered ? `18px,5px,0px` : `0px,0px,0px`
    const width       = hovered ? `16px` : `32px`;
    const spring = useSpring(
        {
            backgroundColor: hovered ? Selected.hover : Selected.primaryInverted,
            transform: `translate3d(${translation}) rotate(${rotation})`,
            width: width
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
    const { hovered } = getStore();
    const { className, styles } = GetLineStyle();
    const rotation = hovered ? `-45deg` : `0deg`;
    const translation = hovered ? `18px,-5px,0px` : `0px,0px,0px`
    const width       = hovered ? `16px` : `32px`;
    const spring = useSpring({
        backgroundColor: hovered ? Selected.hover : Selected.primaryInverted,
        transform: `translate3d(${translation}) rotate(${rotation})`,
        width: width
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