import react, { useState, FC } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';

const Bar = css`
    div {
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        background-color: #00485c;
        overflow: hidden;
        display: inline;
        padding: 5px;
        position: fixed;
        font-size: 6px;
        z-index: 9999;
        color: white;
        width: 100%;
        left: 0;
        top: 0;
    }
    
    input {
        margin: 5px 5px 5px 10px;
        vertical-align: middle;
        overflow: hidden;
        display: inline;
        display: inline;
        width: 40vw;
    }

    form {
        verticalAlign: middle;
        display: inline;
    }
`

const BarImage = css`
    img {
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        margin: 2px 1px 1px 25px;
        vertical-align: middle;
        border-radius: 100%;
        display: inline;
        height: 50px;
        width: 50px;
        left: 0;
    }
`

const Title = css`
    span {
        vertical-align: middle;
        display: inline;
        margin: 10px;
        color: white;
        left: 0px;
        top: 0px;
    }
`

const ServerListStyles = css`
    div {
        vertical-align: middle;
        display: inline-block;
        font-size: 13px;
        margin: 0px 0px 0px 5px;
    }
`

interface State {
    value: string,
    setter: (value: string) => void
}

const DrawIcon: FC = () => 
    <a href="../">
        <img src="/data/images/Olangutan.jpg" />
        <style jsx>{BarImage}</style>
    </a>

const DrawTitle: FC = () => 
    <span className="title">
        Olangutan Analytics
        <style jsx>{Title}</style>
    </span>

const TopBar = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");

    const Router = useRouter();
    
    const HandleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/"+serverRegion+"/"+summonerName);
    }

    const ChangeInput = (e) => {
        setSummonerName(e.target.value);
    }

    return (
        <div>
            <style jsx>{Bar}</style>

            <DrawIcon />
            <DrawTitle />
            <form onSubmit={e => HandleForm(e)}>
                <input
                    className="input is-rounded"
                    type="text"
                    placeholder="Summoner Name"
                    onChange={ChangeInput}
                    value={summonerName}/>
                <ServerList value={serverRegion} setter={setServerRegion} />
            </form>
        </div>
    );
}

const ServerList: FC<State> = ({value, setter}) =>
    <div className="select">
        <style jsx>{ServerListStyles}</style>
        <select 
            value={value}
            onChange={e => setter( e.target.value )}>
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

export default TopBar;