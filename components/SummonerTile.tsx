import React, { FC, useEffect, useState } from 'react'
import { GetTileStyle } from '../pages/[region]/[summoner]';
import { LeagueType } from '../Shared/GameInterfaces';
import { GetSummonerIcon, GetRankData, BlankRankedData } from '../Shared/LeagueContent';
import { useStore } from '../Shared/Store';
import css from 'styled-jsx/css';
import { useColorStore } from './GlobalStyles';

const IconSize = 64;

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

    p {
        color: white;
    }
`

const RankContentStyle = css`
    span {
        display: inline;
        border-radius: 15px;
    }

    div {
        padding: 8px;
    }

    img {
        width: ${IconSize}px;
        height: ${IconSize}px;
        display: flex;
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

const RankedContent: FC<ILeagueType> = ({type}) => {
    const { summoner, receivedData } = useStore();

    const [rank, setRank] = useState({...BlankRankedData});
    
    useEffect(() => setRank(GetRankData(summoner, type)), [receivedData])

    const text = type === LeagueType.SOLO_DUO ?
        "Ranked Solo / Duo" : "Ranked Flex"

    return (
        <>
            <style jsx>{RankContentStyle}</style>

            <img src={rank.imagePath} />
            <div>
                <b>{text}</b><br />
                {rank.rankText}
                {rank.lp !== null &&
                    <span>
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
                    </span>
                }
            </div>
        </>
    )
}

const DrawRankSection: FC<ILeagueType> = (props) => 
    <div>
        <RankedContent type={props.type}/>
        <style jsx>{RankedSection}</style>
    </div>

const Content: FC = () => {

    const {region, summoner } = useStore();
    
    const strRegion     = region;
    const strSummoner   = summoner?.name;
    const summonerLevel = summoner?.summonerLevel;
    const profileIconId = GetSummonerIcon(summoner);

    return (
        <div className="content">
            <p className="title">{strSummoner}</p>
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

const SummonerTile = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetTileStyle(Selected);
    return (
        <div>
            <article className={className}>
                <Content />
            </article>
            {styles}
        </div>
    )
}

export default SummonerTile