import React from 'react'
import { useStore } from '../Shared/StoreContext';
import styled from 'styled-components'
import { Tile } from '../pages/[region]/[summoner]';
import { TStore } from '../Shared/Store';
import { LeagueType, getLeagueType } from '../Shared/GameInterfaces';
import { GetSummonerIcon, GetRankData, IRank } from '../Shared/LeagueContent';
import TopBar from './TopBar';

const IconSize = 64;

const SummonerIcon = styled.img`
    position: absolute;
    
    width: ${IconSize}px;
    height: ${IconSize}px;

    right: 0;
    top: 0;
    bottom: 0;

    border-radius: 12px;
`

const RankedIcon = styled.img`
    width: ${IconSize}px;
    height: ${IconSize}px;
    display: flex;
`

const RankedSection = styled.div`
    width: 330px;
    display: flex;
    margin: 0px 0px 5px 0px;
    padding: 0px 0px 0px 4px;
    border-radius: 15px;

    -webkit-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
    -moz-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
    box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
    ,
`

const RankedText = styled.span`
    display: inline;
    padding: 7px 15px 3px 10px;
    border-radius: 15px;
`

const PlayerTile = styled.article`
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
`

const Player = styled.div`
    padding: 0px ${IconSize+10}px 0px 0px;
    position: relative;
`
const DrawResults = ({ className, children }) => <span className={className}>{children}</span>;

const Wins = styled(DrawResults) `display: inline; color: green;`

const Losses = styled(DrawResults) `display: inline; color: red;`

const SummonerDetails: React.FC = () => {

    const store: TStore = useStore();
    
    const strRegion     = store.region;
    const strSummoner   = store.summoner?.name;
    const summonerLevel = store.summoner?.summonerLevel;
    const profileIconId = GetSummonerIcon(store);
    const soloDuo       = GetRankData(store, LeagueType.SOLO_DUO);
    const flex          = GetRankData(store, LeagueType.FLEX);

    return (
        <>
            <TopBar />
            <PlayerTile className="tile is-child notification is-info">
                <Player>
                    <p className="title">{strSummoner}</p>
                    <p className="subtitle">({strRegion}) Level: {summonerLevel}</p>
                    <SummonerIcon src={profileIconId} />
                    <RankedSection>
                        <RankedIcon src={soloDuo.imagePath} />
                        <RankedText>
                            <b>Ranked Solo-Duo</b><br />
                            {soloDuo.rankText}
                            {soloDuo.lp !== null &&
                                <>
                                    {" - "}
                                    {soloDuo.lp + " LP"}
                                    {" - "}
                                    <Wins>{soloDuo?.wins}W</Wins>
                                    {" / "}
                                    <Losses>{soloDuo?.losses}L</Losses>
                                </>
                            }
                        </RankedText>
                    </RankedSection>
                    <RankedSection>
                        <RankedIcon src={flex.imagePath} />
                        <RankedText>
                            <b>Ranked Flex</b><br />
                            {flex.rankText}
                            {flex.lp !== null &&
                                <>
                                    {" - "}
                                    {flex.lp + " LP"}
                                    {" - "}<Wins>{flex?.wins}W</Wins>
                                    {" / "}
                                    <Losses>{flex?.losses}L</Losses>
                                </>
                            }
                        </RankedText>
                    </RankedSection>
                </Player>
            </PlayerTile>
        </>
    );
}

export default SummonerDetails