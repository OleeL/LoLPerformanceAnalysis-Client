import { FC } from "react";
import { useColorStore } from "./GlobalStyles";
import { Servers } from "../Shared/LeagueContent";
import { State } from "../Shared/StructuralInterfaces";

export const DrawServerList: FC<State> = ({value, setter}) => {
    const {Selected} = useColorStore();
    return (
        <div className="select">
            <select value={value} onChange={e => setter( e.target.value )}>
                {Servers.map((s, i) => 
                    <option key={i} className="dropdown-item">{s}</option>)
                }
            </select>
            
            <style jsx>{`
                    select { background-color: ${Selected.primaryInverted} }

                    div { margin: 0px 5px 0px 0px }

                    .select:not(.is-multiple):not(.is-loading)::after {
                        border-bottom-color: ${Selected.primary};
                        border-left-color:   ${Selected.primary};
                        border-right-color:  ${Selected.primary};
                        border-top-color:    ${Selected.primary};
                        border-color:        ${Selected.primary};
                    }

                    .select:not(.is-multiple):not(.is-loading)::after {
                        border-color:        ${Selected.primary};
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
                `}</style>
        </div>
    );
}