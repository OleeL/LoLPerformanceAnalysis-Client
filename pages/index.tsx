import { useRouter } from 'next/router'
import { FC, useState, FormEvent } from "react";
import { useColorStore, IColorScheme } from "../components/GlobalStyles";
import { State } from '../Shared/StructuralInterfaces';
import css from 'styled-jsx/css';
import DrawLightBulb from '../components/LightBulb';
import DrawServerList from '../components/summoner/ServerList';
import SummonerInput from '../components/spring-components/SummonerInput';

const Page = css`
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

        -webkit-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        -moz-box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
        box-shadow: inset 0px 0px 235px 8px rgba(0,0,0,0.69);
    }
`;

const GetButtonStyles = (Selected: IColorScheme) => css.resolve`
    button {
        display: inline-flex;
        -webkit-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        -moz-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        box-shadow: 0px 0px 5px 2px ${Selected.secondary};
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
        background: ${Selected.primary};
        color: white;
        font-size: 1em;
        padding: 2vw;

        -webkit-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        -moz-box-shadow: 0px 0px 5px 2px ${Selected.secondary};
        box-shadow: 0px 0px 5px 2px ${Selected.secondary};
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
        background-color: ${Selected.primary};
        border-radius: 5px;
        padding: 20px;
        background-size: cover;
        background-position: center center;
        box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
        
        -webkit-box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
        -moz-box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
        box-shadow: 0px 0px 21px 5px rgba(0,0,0,0.58);
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

const index: FC = () =>
    <>
        <div>
            <Content />
        </div>
        <DrawFooter />
        <DrawLightBulb />

        <style jsx>{Page}</style>
    </>


const Content: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetContentStyle(Selected);

    return (
        <div className={className}>
            <DrawComponents />
            {styles}
        </div>
    )
}

const DrawComponents = () =>
    <div>
        <DrawTitle />
        <DrawImage />
        <DrawForm />
        <style jsx>{CenterContent}</style>
    </div>

const DrawTitle: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetHeadingStyle(Selected);
    return (
        <div>
            <h1 className={className}>Olangutan Analytics</h1>
            {styles}
        </div>
    );
}

const DrawImage: FC = () =>
    <>
        <img src={"data/images/Olangutan.jpg"} alt="Olangutan" />
        <style jsx>{Image}</style>
    </>

const DrawForm: FC = () => {
    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");
    const Router = useRouter();

    const HandleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/" + serverRegion + "/" + summonerName);
    }

    return (
        <form onSubmit={e => HandleForm(e)}>
            <DrawInput
                value={summonerName}
                setter={setSummonerName} />
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

const DrawInput: FC<State> = ({ value, setter }) =>
    <div style={{width: '100%'}}>
        <SummonerInput
            value={value}
            maxLength={32}
            onChange={e => setter(e.target.value)}
            type="text"
            placeholder="Summoner Name" />
    </div>

const DrawButtonSubmit: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetButtonStyles(Selected);
    return (
        <div className={className}>
            <button
                className={"button is-primary is-fullwidth " + className}
                type="submit">
                Submit
            </button>
            {styles}
        </div>);
}

const DrawFooter: FC = () => {
    const { Selected } = useColorStore();
    const { className, styles } = GetFooterStyle(Selected);
    return (
        <footer className={className}>
            <p className={className}>
                {styles}
                <b>Olangutan Analytics </b>
                {`isn't endorsed by Riot Games and doesn't reflect the views
                    or opinions of Riot Games or anyone officially involved in
                    producing or managing Riot Games properties. Riot Games, and
                    all associated properties are trademarks or registered
                    trademarks of Riot Games, Inc.`}

            </p>
        </footer>
    );
}

export default index;

