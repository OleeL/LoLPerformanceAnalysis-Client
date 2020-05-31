import React, { useState, useEffect, FormEvent } from "react";
import styled from 'styled-components';
import GetSummonerData from "../Shared/Requests";

const Page = styled.div`
    padding: 30vh 0;
`;

const Title = styled.h1`
    text-align: center;
    margin: 20px;
`

const SummonerInput = styled.input`
    margin: 0px 0px 10px;
`

const GetSummonerName = async (summonerName: string, serverRegion: string) => console.log(await GetSummonerData(summonerName, serverRegion));


const index = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");
    
    const HandleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        GetSummonerName(summonerName, serverRegion);
    }
    
    return (
        <>
            <Page className="columns is-mobile is-multiline is-centered is-vcentered">
                <div className="column is-full">
                        <Title className="title">Olangutan Analytics</Title>
                </div>
                <form className="columns is-mobile is-multiline is-centered is-vcentered" onSubmit={e => HandleForm(e)}>
                    <div className="column is-full">
                        <SummonerInput className="input is-rounded is-focused" value={summonerName} onChange={ e => setSummonerName(e.target.value) } type="text" placeholder="Summoner Name"/>
                    </div>
                    <div className="column is-one-quarter">
                        <div className="select">
                            <select value={serverRegion} onChange={e => setServerRegion(e.target.value)}>
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
                    <div className="column">
                        <button className="button is-primary is-fullwidth" type="submit">Submit</button>
                    </div>
                </form>
            </Page>
            <footer className="footer" style={{height:"0", position:"absolute", bottom: "0", width: "100%"}}>
                <div className="content has-text-centered">
                    <p>
                        <strong>Olangutan Analytics</strong> isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
                    </p>
                </div>
            </footer>
        </>
    );
}

// const ServerList: React.FC = () => {
//     return (
//         <div className="field">
//             <div className="select" value = >
//                 <select>
//                     <option className="dropdown-item">EUW</option>
//                     <option className="dropdown-item">BR</option>
//                     <option className="dropdown-item">EUNE</option>
//                     <option className="dropdown-item">JA</option>
//                     <option className="dropdown-item">KR</option>
//                     <option className="dropdown-item">LAS</option>
//                     <option className="dropdown-item">LAN</option>
//                     <option className="dropdown-item">NA</option>
//                     <option className="dropdown-item">OC</option>
//                     <option className="dropdown-item">TU</option>
//                     <option className="dropdown-item">RU</option>
//                 </select>
//             </div>
//         </div>
//     )
// }

export default index;

