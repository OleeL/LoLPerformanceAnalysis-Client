import { useRouter } from 'next/router'
import { FC, useState, FormEvent } from "react";
import { useColorStore } from "../components/GlobalStyles";
import { Servers } from "../Shared/LeagueContent";
import css from 'styled-jsx/css';

const Page = css`
    div {
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
    }
`;

const ContentStyle = css`
    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50vw;
    }
`;


const Image = css`
    img {
        margin: 0;
        padding: 0;
        position: relative;
        border-radius: 400px;
        width: 100px;
    }

    div {
        text-align: center;
        width: 100vw;
        overflow: hidden;
        margin: 4px 0px 10px 0px;
        padding: 4px;
    }
`;

const FlexStyle = css`
    div {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 25vw;
    }
`

interface State {
    value: string,
    setter: (value: string) => void
}

interface IStringProps {
    text: string,
    index?: number
}

const index: FC = () => 
    <>
        <div>
            <Content />
        </div> 
        <DrawFooter />
        <style jsx>{Page}</style>
    </>

const Content: FC = () =>
    <div>
        <DrawTitle />
        <DrawImage />
        <DrawForm />
        <style jsx>{ContentStyle}</style>
    </div>    

const DrawTitle: FC = () => {
    const { Selected } = useColorStore();

    return ( 
        <>
            <h1>Olangutan Analytics</h1>
            <style jsx>{`
                h1 {
                    text-align: center;
                    color: ${Selected.primaryInverted};
                    font-size: 2.2em;
                    margin: 4px;
                }
            `}</style>
        </>
    );
}

const DrawImage: FC = () =>
    <div>
        <img src={"data/images/Olangutan.jpg"} alt="Olangutan"/>
        <style jsx>{Image}</style>
    </div>

const DrawForm: FC = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");
    const Router = useRouter();
    
    const HandleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/"+serverRegion+"/"+summonerName);
    }

    return (
        <form
            onSubmit={e => HandleForm(e)}>
            <DrawInput
                value={summonerName}
                setter={setSummonerName}/>
            <div>
                <DrawServerList
                    value={serverRegion}
                    setter={setServerRegion}/>
                <DrawButtonSubmit />
                <style jsx>{FlexStyle}</style>
            </div>
        </form>
    );
}

const DrawInput: FC<State> = ({value, setter}) => {
    const { Selected } = useColorStore();
    return (
        <div>
            <style jsx>{`
                input {
                    margin: 0px 0px 10px;
                    background-color: ${Selected.primaryInverted};
                    width: 100%;
                }

                div { width: 100% }

                .is-focused.input {
                    border-color: ${Selected.primary};
                    -webkit-box-shadow: 0px 0px 5px 2px ${Selected.primary};
                    -moz-box-shadow: 0px 0px 5px 2px ${Selected.primary};
                    box-shadow: 0px 0px 5px 2px ${Selected.primary};
                }
            `}</style>
            <input 
                className="input is-rounded is-focused"
                value={value}
                onChange={e => setter(e.target.value)}
                type="text" placeholder="Summoner Name"/>

    </div>)
}

export const DrawServerList: FC<State> = ({value, setter}) => {
    const {Selected} = useColorStore();
    return (
        <div className="select">
            <select value={value} onChange={e => setter( e.target.value )}>
                {Servers.map((s, i) => <DrawOption key={i} text={s}/>)}
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

const DrawOption: FC<IStringProps> = ({text, index}) =>
    <option key={index} className="dropdown-item">{text}</option>

const DrawButtonSubmit: FC = () => {
    const {Selected} = useColorStore();
    return (
    <div>
        <button
            className="button is-primary is-fullwidth"
            type="submit">
            Submit
        </button>
        
        <style jsx>{`
                button {
                    display: inline-flex;
                    -webkit-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                    -moz-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                    box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                }

                div { 
                    flex-grow: 10;
                }
            `}
        </style>
    </div>);
}

const DrawFooter: FC = () => {
    const {Selected} = useColorStore();

    return (
        <>
            <footer>
                    <p>
                        <b>Olangutan Analytics </b>
                        {`isn't endorsed by Riot Games and doesn't reflect the views
                        or opinions of Riot Games or anyone officially involved in
                        producing or managing Riot Games properties. Riot Games, and
                        all associated properties are trademarks or registered
                        trademarks of Riot Games, Inc.`}
                    </p>

            </footer>
            <style jsx>{`        
                footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    height: auto;
                    width: 100vw;
                    vertical-align: top;

                    bottom: 0;
                    background: ${Selected.primary};
                    color: white;
                    font-size: 1em;
                    padding: 2vw;

                    -webkit-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                    -moz-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                    box-shadow: 0px 0px 5px 2px ${Selected.secondary};
                }

                p {
                    text-align: center;
                    vertical-align: middle;
                }
        `}</style>
        </>
    );
}

export default index;

