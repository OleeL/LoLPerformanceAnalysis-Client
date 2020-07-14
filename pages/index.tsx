import { useRouter } from 'next/router'
import { FC, useState, FormEvent } from "react";
import { useColorStore } from "../components/GlobalStyles";
import { Servers } from "../Shared/LeagueContent";
import css from 'styled-jsx/css';

const Page = css`
    div {
        padding: 30vh 0;
    }
`;

const SummonerInput = css`
    input {
        margin: 0px 0px 10px;
    }
`;

const Image = css`
    img {
        margin: 0 auto;
        padding: 0;
        position: relative;
        border-radius: 400px;
        width: 100px;
        z-index:1;
    }

    div {
        text-align: center;
        width: 100vw;
        overflow: hidden;
        margin: 4px 0px 10px 0px;
        padding: 4px;
    }
`;

interface State {
    value: string,
    setter: (value: string) => void
}

interface IStringProps {
    text: string,
    index?: number
}

const index = () => 
    <>
        <div className="columns is-multiline is-centered is-vcentered">
            <style jsx>{Page}</style>

            <DrawTitle />
            <DrawImage />
            <DrawForm />
        </div>
        <DrawFooter />
    </>

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
            className="columns is-multiline is-centered is-vcentered"
            onSubmit={e => HandleForm(e)}>
            <DrawInput
                value={summonerName}
                setter={setSummonerName}/>
            <DrawServerList
                value={serverRegion}
                setter={setServerRegion}/>
            <DrawButtonSubmit />
        </form>
    );
}

const DrawTitle: FC = () => {
    const { Selected } = useColorStore();

    return ( 
        <div>
            <h1>Olangutan Analytics</h1>
            <style jsx>{`
                h1 {
                    text-align: center;
                    color: ${Selected.color};
                    font-size: 2.2em;
                    margin: 4px;
                }
            `}</style>
        </div>
    );
}


const DrawImage: FC = () =>
    <div>
        <img src={"data/images/Olangutan.jpg"} alt="Olangutan"/>
        <style jsx>{Image}</style>
    </div>

const DrawFooter: FC = () => {
    const {Selected} = useColorStore();

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    <b>Olangutan Analytics </b>
                    isn't endorsed by Riot Games and doesn't reflect the views or
                    opinions of Riot Games or anyone officially involved in
                    producing or managing Riot Games properties. Riot Games, and
                    all associated properties are trademarks or registered
                    trademarks of Riot Games, Inc.
                </p>
            </div>
            <style jsx>{`        
                footer {
                    height: 0;
                    position: absolute;
                    bottom: 0; 
                    width: 100%;
                    background: ${Selected.primary};
                    color: white;
                }
        `}</style>
        </footer>
    );
}

const DrawInput: FC<State> = ({value, setter}) =>
    <div className="column is-full">
        <input 
            className="input is-primary is-rounded is-focused"
            value={value}
            onChange={e => setter(e.target.value)}
            type="text" placeholder="Summoner Name" />
        <style jsx>
            {SummonerInput}
        </style>
    </div>

export const DrawServerList: FC<State> = ({value, setter}) =>
    <div className="column is-one-quarter">
        <div className="select">
            <select value={value} onChange={e => setter( e.target.value )}>
                {Servers.map((server, i) => <DrawOption key={i} text={server} index={i} />)}
            </select>
        </div>
    </div>

const DrawOption: FC<IStringProps> = ({text, index}) =>
    <option key={index} className="dropdown-item">{text}</option>

const DrawButtonSubmit: FC = () => 
    <div className="column">
        <button
            className="button is-primary is-fullwidth"
            type="submit">
            Submit
        </button>
    </div>

export default index;

