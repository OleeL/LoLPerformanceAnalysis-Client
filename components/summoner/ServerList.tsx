import { FC, useState } from "react";
import { useColorStore, IColorScheme } from "../GlobalStyles";
import { Servers } from "../../Shared/LeagueContent";
import { State } from "../../Shared/StructuralInterfaces";
import css from 'styled-jsx/css';
import { animated, useSpring } from "react-spring";

const GetHeadingStyle = (Selected: IColorScheme) => css.resolve`
    div {
        margin: 0px 5px 0px 0px;
    }
    
    select {
        font-size: 15px;
        font-family: sans-serif;
        background-color: ${Selected.primaryInverted};
        margin: 0px;
        height: 40px;
    }
    
    option {
        font-size: 15px;
        font-family: sans-serif;
        background-color: ${Selected.primaryInverted};
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-bottom-color: ${Selected.primary};
        border-left-color:   ${Selected.primary};
        border-right-color:  ${Selected.primary};
        border-top-color:    ${Selected.primary};
        border-color:        ${Selected.primary};
    }

    .select:not(.is-multiple):not(.is-loading)::after {
        border-color: ${Selected.primary};
    }

    .select:not(.is-multiple) {
        height: 100%;
    }

    select:hover {
        border-color: ${Selected.input.hoverColor};
        -webkit-box-shadow: 0px 0px 5px 0px ${Selected.primary};
        -moz-box-shadow: 0px 0px 5px 0px ${Selected.primary};
        box-shadow: 0px 0px 5px 0px ${Selected.primary};
    }

    select:focus {
        border-color: ${Selected.input.focusColor};
        -webkit-box-shadow: 0px 0px 5px 2px ${Selected.primary};
        -moz-box-shadow: 0px 0px 5px 2px ${Selected.primary};
        box-shadow: 0px 0px 5px 2px ${Selected.primary};
    }
`

const DrawServerList: FC<State> = ({ value, setter }, props) => {
    const { Selected } = useColorStore();
    const { className, styles } = GetHeadingStyle(Selected);
    const cName = "select " + (props.className ?? "") + " " + className;
    return (
        <div
            className={cName}>
            <RawServerList value={value} setter={setter}/>
            {styles}
        </div>
    );
}

export const RawServerList: FC<State> = ({ value, setter }, props) => {
    const { Selected } = useColorStore();
    const { className, styles } = GetHeadingStyle(Selected);

    const [hovered, setHover] = useState(false);
    const cName = "dropdown-item " + className + " " + props.className
    const spring = useSpring({
        backgroundColor: Selected.secondary,
        color: Selected.input.color,
        border: `1px solid ${hovered ? Selected.input.borderColor : Selected.secondary}`
    });
    
    return (
        <animated.select
            value={value}
            className={className}
            style={spring}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onChange={e => setter(e.target.value)}>
            {Servers.map((server, i) =>
                <option
                    key={i}
                    className={cName}>
                    {server}
                </option>)
            }
            {styles}
        </animated.select>
    );
}

export default DrawServerList;