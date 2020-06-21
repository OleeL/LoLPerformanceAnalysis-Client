import react, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Bar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 55px;
    background-color: #00b0e0;
    color: white;
    display: inline;
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    overflow: hidden;
`

const BarImage = styled.img`
    width: 50px;
    height: 50px;
    left: 0;
    border-radius: 100%;
    margin: 2px 1px 1px 25px;
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    vertical-align: middle;
    display: inline;
`

const Title = styled.span`
    color: white;
    top: 0px;
    left: 0px;
    margin: 10px;
    vertical-align: middle;
    display: inline;
`

const Input = styled.input`
    display: inline;
    overflow: hidden;
    margin: 5px 5px 5px 10px;
    width: 40vw;
`

const DropDown = styled.div`
    margin: 10px;
`

interface State {
    value: string,
    setter: (value: string) => void
}

const TopBar = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");

    const Router = useRouter();
    
    const HandleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(summonerName);
        Router.replace("/"+serverRegion+"/"+summonerName);
    }

    const ChangeInput = (e) => {
        setSummonerName(e.target.value);
        console.log(e);
        console.log(e.value);
        console.log(summonerName);
    }

    return (
        <Bar className="primary">
            <a href="../"><BarImage src="/data/images/Olangutan.jpg" /></a>
            <Title className="title">
                Olangutan Analytics
            </Title>
            <form onSubmit={e => HandleForm(e)} style={{display: "inline", verticalAlign: "middle"}}>
                <Input className="input is-rounded" type="text" placeholder="Summoner Name" onChange={ChangeInput} value={summonerName} style={{display: "inline", verticalAlign: "middle"}} />
                <ServerList value={serverRegion} setter={setServerRegion} />
            </form>
        </Bar>);
}

const ServerList: React.FC<State> = ({value, setter}) =>
    <DropDown className="column is-one-quarter" style={{display: "inline", verticalAlign: "middle", padding: "10px 0px 10px 0px"}}>
        <div className="select" style={{display: "inline"}}>
            <select value={value} onChange={e => setter( e.target.value )} style={{display: "inline"}}>
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
    </DropDown>

export default TopBar;