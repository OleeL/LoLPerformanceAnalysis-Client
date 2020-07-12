import { SendGetSummoner } from "../Shared/Requests";
import { useStore } from "../Shared/Store";
import { useRouter } from 'next/router'
import { FC, useState, FormEvent } from "react";
import { Primary } from "../components/GlobalStyles";
import css from 'styled-jsx/css';

const Page = css`
    div {
        padding: 30vh 0;
    }
`;

const Title = css`
    h1 {
        text-align: center;
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

const Footer = css`
    footer {
        height: 0;
        position: absolute;
        bottom: 0; 
        width: 100%;
        background: ${Primary};
        color: white;
    }
`;

interface State {
    value: string,
    setter: (value: string) => void
}

const index = () => {
    return (
        <>
            <div className="columns is-multiline is-centered is-vcentered">
                <DrawTitle />
                <DrawImage />
                <DrawForm />
                <style jsx>{Page}</style>
            </div>
            <DrawFooter />
        </>
    );
}

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

const DrawTitle: FC = () => 
    <div className="column is-full">
        <h1 className="title">Olangutan Analytics</h1>
        <style jsx>{Title}</style>
    </div>

const DrawImage: FC = () =>
    <>
        <div>
            <img src={"data/images/Olangutan.jpg"} alt="Olangutan"/>
            <style jsx>{Image}</style>
        </div>
    </>

const DrawFooter: FC = () => 
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
        <style jsx>{Footer}</style>
    </footer>

const DrawInput: FC<State> = ({value, setter}) =>
    <div className="column is-full">
        <input 
            className="input is-rounded is-focused"
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
                    <option className="dropdown-item">EUW</option>
                    <option className="dropdown-item">EUNE</option>
                    <option className="dropdown-item">NA</option>
                    <option className="dropdown-item">BR</option>
                    <option className="dropdown-item">JA</option>
                    <option className="dropdown-item">KR</option>
                    <option className="dropdown-item">LAS</option>
                    <option className="dropdown-item">LAN</option>
                    <option className="dropdown-item">OC</option>
                    <option className="dropdown-item">TU</option>
                    <option className="dropdown-item">RU</option>
                </select>
            </div>
        </div>

const DrawButtonSubmit: FC = () => 
    <div className="column">
        <button
            className="button is-primary is-fullwidth"
            type="submit">
            Submit
        </button>
    </div>

export default index;

