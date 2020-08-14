import { useState, FC } from "react";
import { animated, useSpring } from "react-spring";
import { useColorStore, IColorScheme } from "./GlobalStyles";
import css from 'styled-jsx/css';

interface IPress {
    onClick?: () => void;
    cName?: string
}

const GetButtonStyle = (Selected: IColorScheme, bulb: string) => css.resolve`
    div {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 15px;
        top: 15px;
        border-radius: 5px;
        padding: 10px;
        user-select: none;

        -webkit-box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
        -moz-box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
        box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.66);
    }

    div:hover {
        background-color: ${Selected.color};
    }

    img {
        pointer-events: none;
    }

    .filter-bulb{
        ${bulb}
    }
`;

const BulbOn = `filter:
    invert(80%)
    saturate(100%)
    hue-rotate(342deg)
    brightness(100%)
    contrast(100%);`

const DrawLightBulb: FC<IPress> = ({ onClick, cName }) => {
    const [active, setActive] = useState(false);
    const { Selected, Toggle } = useColorStore();
    const { className, styles } = GetButtonStyle(Selected, active ? BulbOn : ``);
    
    const spring = useSpring({
        backgroundColor: Selected.primary,
    });

    const Click = () => {
        if (onClick) onClick();
        setActive(!active);
        Toggle();
    }

    return (
        <animated.div
            onClick={Click}
            style={spring}
            className={className + ` ` + cName}>
            {styles}
            <animated.img
                src="/data/images/svgs/bulb.svg"
                className={className + " filter-bulb"} />

        </animated.div>
    );
}

export default DrawLightBulb;