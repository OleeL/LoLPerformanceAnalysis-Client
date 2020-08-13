import { FC, useRef, useState } from "react";
import { useColorStore, IColorScheme } from "../GlobalStyles";
import { useSpring, animated, SpringConfig } from "react-spring";
import css from 'styled-jsx/css';

interface IInteractive {
    className?: string;
    value?: string;
    maxLength?: number;
    onChange?: (e: any) => void;
    type?: string;
    placeholder?: string
}

const GetInputStyle = (Selected: IColorScheme) => css.resolve`
    input {
        margin: 0px 0px 10px;
        width: 100%;
        padding: 7px 10px 7px 10px;
        border: 1px solid ${Selected.input.borderColor};
        border-radius: 5px;
        font-size: 16px;
        color: ${Selected.input.color};
    }
`

const springConfig: SpringConfig = { mass: 1, tension: 170, friction: 26 };

export const SummonerInput: FC<IInteractive> = (props) => {
    const Selected: IColorScheme = useColorStore(state => state.Selected);

    const [hovered, setHovered] = useState(false);
    const [focussed, setFocussed] = useState(false);
    const { className, styles } = GetInputStyle(Selected);

    const spring = useSpring({
        backgroundColor: focussed || hovered ? Selected.input.hoverColor : Selected.input.backgroundColor,
        borderColor: focussed ? Selected.input.focusColor : Selected.input.borderColor,
        boxShadow: focussed ? Selected.input.focusColor : Selected.input.borderColor
    });

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);
    const onFocusEnter = () => setFocussed(true);
    const onFocusLeave = () => setFocussed(false);

    return (
        <>
            <animated.input
                className={className}
                {...props}
                style={spring}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocusEnter}
                onBlur={onFocusLeave}/>
            {styles}
        </>
    )
}

export default SummonerInput;