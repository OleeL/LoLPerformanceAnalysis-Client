import React, { FC, useEffect, useState } from 'react'
import { GetTileStyle } from '../../../pages/[region]/[summoner]';
import { LeagueType } from '../../../Shared/GameInterfaces';
import { GetSummonerIcon, GetRankData, BlankRankedData } from '../../../Shared/LeagueContent';
import { useStore } from '../../../Shared/Store';
import css from 'styled-jsx/css';
import { useColorStore, IColorScheme } from '../../GlobalStyles';
import { useSpring, animated } from 'react-spring';

const IconSize = 64;

const GetRankedSection = (Selected: IColorScheme) => css.resolve`
    div {
        width: 330px;
        display: flex;
        margin: 0px 0px 5px 0px;
        padding: 0px 0px 0px 4px;
        border-radius: 15px;
        

        ${Selected.shadows && `
            -webkit-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
            -moz-box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
            box-shadow: inset 0px 0px 15px -1px rgba(0,0,0,0.5);
        `}
    }
`

const GetPlayerStyles = (Selected: IColorScheme) => css.resolve`
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
        
        ${Selected.shadows && `box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.5)`};
    }

    h1, h2 {
        color: white;
        font-size: 32px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 32px;
    }

    h2 {
        font-size: 20px;
        font-weight: 500;
        line-height: 25px;
        margin-bottom: 16px;
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
    const summoner = useStore(state => state.summoner);
    const receivedData = useStore(state => state.receivedData);

    const [rank, setRank] = useState({...BlankRankedData});
    
    useEffect(() => setRank(GetRankData(summoner, type)), [receivedData]);

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

const DrawRankSection: FC<ILeagueType> = ({type}) => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetRankedSection(Selected);
    const spring = useSpring({border: `1px solid ${Selected.input.borderColor}`})

    return (
        <animated.div className={className} style={spring}>
            <RankedContent type={type}/>
            {styles}
        </animated.div>
    )
}

const Content = () => {

    const region = useStore(state => state.region);
    const summoner = useStore(state => state.summoner);
    
    const strRegion     = region;
    const strSummoner   = summoner?.name;
    const summonerLevel = summoner?.summonerLevel;
    const profileIconId = GetSummonerIcon(summoner);

    const Selected = useColorStore(state => state.Selected);

    const { className, styles } = GetPlayerStyles(Selected);

    return (
        <div className={className}>
            <h1 className={className}>{strSummoner}</h1>
            <h2 className={className}>
                {strRegion} Level: {summonerLevel}
            </h2>
            <img className={className} src={profileIconId} />
            <DrawRankSection type={LeagueType.SOLO_DUO}/>
            <DrawRankSection type={LeagueType.FLEX}/>
            {styles}
        </div>
    );
}

const SummonerTile = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetTileStyle(Selected);
    return (
        <article className={className}>
            <Content />
            {styles}
        </article>
    )
}

export default SummonerTile