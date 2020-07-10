import React, { useState, useEffect, FormEvent } from "react";
import styled from 'styled-components';
import { SendGetSummoner } from "../Shared/Requests";
import { useStore } from "../Shared/StoreContext";
import { useRouter } from 'next/router'
import { TStore } from "../Shared/Store";
import { useObserver } from "mobx-react-lite";

const Primary = "#00b0e0";

const Page = styled.div`
    padding: 30vh 0;
`;

const Title = styled.h1`
    text-align: center;
`

const SummonerInput = styled.input`
    margin: 0px 0px 10px;
`

const ImageContainer = styled.div`
    text-align: center;
    width: 100vw;
    overflow: hidden;
    margin: 4px 0px 10px 0px;
    padding: 4px;
`

const Image = styled.img`
    
    margin: 0 auto;
    padding: 0;
    
    position: relative;

    border-radius: 400px;
    box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.5);

    width: 100px;
    
    z-index:1;
`

const Footer = styled.footer`
    height: 0;
    position: absolute;
    bottom: 0; 
    width: 100%;
    background: ${Primary};
    color: white;
`

interface State {
    value: string,
    setter: (value: string) => void
}

const index = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");

    const Router = useRouter();
    const store: TStore = useStore();
    
    const HandleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/"+serverRegion+"/"+summonerName);
    }

    return useObserver(() => {
        const connected = store.connected;
        return (
            <>
                <Page className="columns is-mobile is-multiline is-centered is-vcentered">
                    <DrawTitle />
                    <ImageContainer>
                        <Image src={"data/images/Olangutan.jpg"} alt="Olangutan" />
                    </ImageContainer>
                    <form className="columns is-mobile is-multiline is-centered is-vcentered" onSubmit={e => HandleForm(e)}>
                        <DrawInput value={summonerName} setter={setSummonerName}/>
                        <DrawServerList value={serverRegion} setter={setServerRegion} />
                        <DrawButtonSubmit />
                    </form>
                </Page>
                <DrawFooter />
            </>
        );
    })
}

const DrawTitle: React.FC = () => 
    <div className="column is-full">
        <Title className="title">Olangutan Analytics</Title>
    </div>

const DrawFooter: React.FC = () => 
    <Footer className="footer">
        <div className="content has-text-centered">
            <p>
                <b>Olangutan Analytics</b> isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
            </p>
        </div>
    </Footer>

const DrawInput: React.FC<State> = ({value, setter}) =>
    <div className="column is-full">
        <SummonerInput className="input is-rounded is-focused" value={value} onChange={e => setter(e.target.value)} type="text" placeholder="Summoner Name" />
    </div>

export const DrawServerList: React.FC<State> = ({value, setter}) =>
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

const DrawButtonSubmit: React.FC = () => 
    <div className="column">
        <button className="button is-primary is-fullwidth" type="submit">Submit</button>
    </div>

export default index;

