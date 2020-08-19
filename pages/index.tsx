import { useRouter } from 'next/router'
import { FC, useState, FormEvent } from "react";
import { useColorStore, IColorScheme } from "../components/GlobalStyles";
import css from 'styled-jsx/css';
import DrawColorDial from '../components/ColorDial';
import DrawServerList from '../components/summoner/ServerList';
import SummonerInput from '../components/spring-components/SummonerInput';
import { useSpring, animated } from 'react-spring';

const GetPageStyles = (Selected: IColorScheme) => css.resolve`
    div {
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
        z-index: -1;

        ${Selected.shadows &&
        `-webkit-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        -moz-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        `}
    }
`;

const GetButtonStyles = () => css.resolve`
    button {
        display: inline-flex;
    }

    div { 
        flex-grow: 10;
    }
`

const GetFooterStyle = (Selected: IColorScheme) => css.resolve`        
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        height: auto;
        width: 100vw;
        vertical-align: top;

        bottom: 0;
        font-size: 1em;
        padding: 2vw;


        ${Selected.shadows && ` 
        -webkit-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        -moz-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        `}
    }

    p {
        text-align: center;
        vertical-align: middle;
    }
`

const GetContentStyle = (Selected: IColorScheme) => css.resolve`
    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 450px;
        height: 450px;
        vertical-align: middle;
        border-radius: 5px;
        padding: 20px;
        background-size: cover;
        background-position: center center;

        

        ${Selected.shadows && ` 
        -webkit-box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
        -moz-box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
        box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
        `}
    }
`;

const GetHeadingStyle = (Selected: IColorScheme) => css.resolve`
    h1 {
        text-align: center;
        color: ${Selected.primaryInverted};
        font-size: 2.2em;
        font-weight: bold;
        margin: 4px;
    }
`

const CenterContent = css`
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
`


const Image = css`
    img {
        margin: 10px;
        position: relative;
        border-radius: 400px;
        width: 100px;
        pointer-events: none;
    }
`;

const FlexStyle = css`
    div {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    form {
        width: 80%;
    }
`

const index = () => {
    const Selected = useColorStore(state => state.Selected);
    const spring = useSpring({
        backgroundColor: Selected.backgroundColor,
        color: Selected.color
    });
    const {className, styles} = GetPageStyles(Selected);

    return (
        <>
            <animated.div className={className} style={spring}>
                <Content />
                {styles}
            </animated.div>
            <DrawFooter />
            <DrawColorDial />
        </>
    );
}


const Content = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetContentStyle(Selected);
    const spring = useSpring({
        backgroundColor: Selected.primary,
    });

    return (
        <animated.div className={className} style={spring}>
            <DrawComponents />
            {styles}
        </animated.div>
    )
}

const DrawComponents = () =>
    <div>
        <DrawTitle />
        <DrawImage />
        <DrawForm />
        <style jsx>{CenterContent}</style>
    </div>

const DrawTitle = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetHeadingStyle(Selected);

    const spring = useSpring({
        color: Selected.color
    });

    return (
        <div>
            <animated.h1
                style={spring}
                className={className}>
                    Olangutan Analytics
            </animated.h1>
            {styles}
        </div>
    );
}

const DrawImage = () =>
    <>
        <img src={"data/images/Olangutan.jpg"} alt="Olangutan" />
        <style jsx>{Image}</style>
    </>

const DrawForm = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");
    const Router = useRouter();

    const HandleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/" + serverRegion + "/" + summonerName);
    }

    return (
        <form onSubmit={e => HandleForm(e)}>
            <SummonerInput
                value={summonerName}
                maxLength={32}
                onChange={e => setSummonerName(e.target.value)}
                type="text"
                placeholder="Summoner Name" />
            <div>
                <DrawServerList
                    value={serverRegion}
                    setter={setServerRegion} />
                <DrawButtonSubmit />
            </div>
            <style jsx>{FlexStyle}</style>
        </form>
    );
}

const DrawButtonSubmit = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetButtonStyles();
    const [hover, setHover] = useState(false);
    
    const spring = useSpring({
        backgroundColor: Selected.secondary,
        color: Selected.color,
        border: `1px solid ${hover ? Selected.input.borderColor : Selected.secondary}`
    });

    return (
        <div className={className}>
            <animated.button
                className={"button is-fullwidth " + className}
                style={spring}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                type="submit">
                Submit
            </animated.button>
            {styles}
        </div>);
}

const DrawFooter = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetFooterStyle(Selected);
    const spring = useSpring({
        backgroundColor: Selected.primary,
        color: Selected.color
    });

    return (
        <animated.footer className={className} style={spring}>
            <p className={className} style={spring}>
                <b>Olangutan Analytics </b>
                {`isn't endorsed by Riot Games and doesn't reflect the views
                    or opinions of Riot Games or anyone officially involved in
                    producing or managing Riot Games properties. Riot Games, and
                    all associated properties are trademarks or registered
                    trademarks of Riot Games, Inc.`}
                {styles}
            </p>
        </animated.footer>
    );
}

export default index;

