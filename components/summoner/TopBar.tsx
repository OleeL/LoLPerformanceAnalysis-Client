import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import DrawServerList from './ServerList';
import { State } from '../../Shared/StructuralInterfaces';

const Bar = css`
    div {
        display: inline-flex;
        flex-wrap: wrap;
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        background-color: #00485c;
        overflow: hidden;
        position: fixed;
        font-size: 6px;
        z-index: 9999;
        color: white;
        width: 100%;
        left: 0;
        top: 0;
        align-items: center; 
        justify-content: center;
        vertical-align: middle;
        padding: 5px;
    }
    
    input {
        margin: 5px 5px 5px 10px;
        vertical-align: middle;
        overflow: hidden;
        flex-grow: 1;
    }

    form {
        vertical-align: middle;
        display: inline-flex;
        flex-grow: 1;
        padding: 1px;
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
        margin: 3px 10px 3px 10px;
        color: white;
        left: 0px;
        top: 0px;
        font-size: 32px;
    }
`

const ServerListStyles = css`
    div {
        vertical-align: middle;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 13px;
        margin: 0px 0px 0px 5px;
  align-items: center; 
  justify-content: center;
    }
`

const DrawIcon: FC = () => 
    <a href="../">
        <img src="/data/images/Olangutan.jpg" />
        <style jsx>{BarImage}</style>
    </a>

const DrawTitle: FC = () => 
    <span>
        <b>Olangutan Analytics</b>
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
                <ServerList
                    value={serverRegion}
                    setter={setServerRegion}/>
            </form>
        </div>
    );
}

const ServerList: FC<State> = ({ value, setter }) => 
    <div>
        <DrawServerList
            value={value}
            setter={setter}/>
        <style jsx>{ServerListStyles}</style>
    </div>

export default TopBar;