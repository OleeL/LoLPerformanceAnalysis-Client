import React, { FC, useEffect } from 'react'
import { Tile } from '../pages/[region]/[summoner]';
import { LeagueType, ISummoner } from '../Shared/GameInterfaces';
import { GetSummonerIcon, GetRankData, IRank } from '../Shared/LeagueContent';
import { useStore } from '../Shared/Store';
import css from 'styled-jsx/css';

const IconSize = 64;

const RankedIcon = css`
    img {
        width: ${IconSize}px;
        height: ${IconSize}px;
        display: flex;
    }
`

const RankedSection = css`
    div {
        width: 330px;
        display: flex;
        margin: 0px 0px 5px 0px;
        padding: 0px 0px 0px 4px;
        border-radius: 15px;
    
        -webkit-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
        -moz-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
        box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
    }
    
    span {
        display: inline;
        padding: 7px 15px 3px 10px;
        border-radius: 15px;
    }
`

const Player = css`
    div {
        padding: 0px ${IconSize+10}px 0px 0px;
        position: relative;
    }

    img {
        position: absolute;
        
        width: ${IconSize}px;
        height: ${IconSize}px;
    
        right: 0;
        top: 0;
        bottom: 0;
    
        border-radius: 12px;
        
        box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.5);
    }
    
    article {
        padding: 20px;
        -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    }
`

interface IColoredText {
    text: string,
    color: string
}

const ColouredText: FC<IColoredText> = (props) =>
    <span>
        {props.text}
        <style jsx>{`
            span {
                display: inline;
                color: ${props.color};
            }
        `}</style>
    </span>

interface ILeagueType {
    type: LeagueType
}

const DrawRankSection: FC<ILeagueType> = ({type}) => {
    const { summoner, connected } = useStore();
    let rank: IRank;
    useEffect(() => {
        rank = type === LeagueType.SOLO_DUO ? 
        GetRankData(summoner, LeagueType.SOLO_DUO)
        : GetRankData(summoner, LeagueType.FLEX);
    }, [connected])

    if (!rank) return <> </>

    return (
        <div>
            <RankedIcon src={rank.imagePath} />
            <div>
                <b>Ranked Flex</b><br />
                {rank.rankText}
                {rank.lp !== null &&
                    <>
                        {" - "}
                        {rank.lp + " LP"}
                        {" - "}
                        <ColouredText
                            text = {`${rank?.wins}W`}
                            color = "green"/>
                        {" / "}
                        <ColouredText
                            text = {`${rank?.losses}L`}
                            color = "red"/>
                    </>
                }
            </div>
            <style jsx>{RankedSection}</style>
        </div>
    )
}

const Content: React.FC = () => {

    const {region, summoner } = useStore();
    
    const strRegion     = region;
    const strSummoner   = summoner?.name;
    const summonerLevel = summoner?.summonerLevel;
    const profileIconId = GetSummonerIcon(summoner);

    return (
        <div>
            <p className="title">
                {strSummoner}
            </p>
            <p className="subtitle">
                {strRegion} Level: {summonerLevel}
            </p>
            <img src={profileIconId} />
            <DrawRankSection type={LeagueType.SOLO_DUO}/>
            <DrawRankSection type={LeagueType.FLEX}/>
            <style jsx>{Player}</style>
        </div>
    );
}

const SummonerTile = () => 
    <article className="tile is-child notification is-info">
        <Content />
        <style jsx>{Tile}</style>
    </article>

export default SummonerTile