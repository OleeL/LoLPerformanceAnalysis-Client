import { FC } from "react";
import { useColorStore, IColorScheme } from "../GlobalStyles";
import { Servers } from "../../Shared/LeagueContent";
import { State } from "../../Shared/StructuralInterfaces";
import css from 'styled-jsx/css';

const GetHeadingStyle = (Selected: IColorScheme) => css.resolve`
    select { 
        background-color: ${Selected.primaryInverted};
        height: 100%;
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

    div {
        margin-right: 5px;
        height: 100%;
    }

    .select:not(.is-multiple) {
        height: 80%;
    }

    select:hover {
        border-color: ${Selected.primary};
        -webkit-box-shadow: 0px 0px 5px 0px ${Selected.primary};
        -moz-box-shadow: 0px 0px 5px 0px ${Selected.primary};
        box-shadow: 0px 0px 5px 0px ${Selected.primary};
    }

    select:focus {
        border-color: ${Selected.primary};
        -webkit-box-shadow: 0px 0px 5px 2px ${Selected.primary};
        -moz-box-shadow: 0px 0px 5px 2px ${Selected.primary};
        box-shadow: 0px 0px 5px 2px ${Selected.primary};
    }
`

const DrawServerList: FC<State> = ({ value, setter }, props) => {
    const { Selected } = useColorStore();
    const { className, styles } = GetHeadingStyle(Selected);
    const cName = "select " + className + " " + props.className;
    return (
        <div
            className={cName}>
            <RawServerList value={value} setter={setter}/>
            <style jsx>{styles}</style>
        </div>
    );
}

export const RawServerList: FC<State> = ({ value, setter }, props) => {
    const { Selected } = useColorStore();
    const { className, styles } = GetHeadingStyle(Selected);
    const cName = "dropdown-item " + className + props.className
    return (
        <select
            value={value}
            className={className}
            onChange={e => setter(e.target.value)}>
            {Servers.map((server, i) =>
                <option
                    key={i}
                    className={cName}>
                    {server}
                </option>)
            }
            {styles}
        </select>
    );
}

export default DrawServerList;