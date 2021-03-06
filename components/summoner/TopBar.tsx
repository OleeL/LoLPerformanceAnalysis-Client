import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import DrawServerList from './ServerList';
import { State } from '../../Shared/StructuralInterfaces';
import { IColorScheme, useColorStore } from '../GlobalStyles';
import BurgerButton, { useBurgerStore } from '../Buttons/BurgerButton';
import { useSpring, animated } from 'react-spring';

const GetBarStyle = (Selected: IColorScheme) => css.resolve`
    div {
        display: inline-flex;
        flex-wrap: wrap;
        ${Selected.shadows && `box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5)`};
        background-color: ${Selected.primary};
        clip:rect(0px, 20000px, 20000px, 0px);
        overflow: hidden;
        position: fixed;
        font-size: 6px;
        z-index: 99;
        width: 100%;
        color: white;
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
        background-color: ${Selected.primaryInverted};
        border: none;
    }

    .is-focused.input {
        border-color: ${Selected.primary};
        width: 100%;
    }

    form {
        vertical-align: middle;
        display: inline-flex;
        flex-grow: 1;
        padding: 1px;
    }
`

const GetBarImageStyle = (Selected: IColorScheme) => css.resolve`
    img {
        ${Selected.shadows && `box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5)`};
        vertical-align: middle;
        border-radius: 100%;
        display: inline;
        height: 50px;
        width: 50px;
        margin-left: 10px;
        margin-right: 6px;
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
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 13px;
        margin: 0px 0px 0px 5px;
        align-items: center; 
        vertical-align: middle;
        justify-content: center;
    }
`

const DrawIcon: FC = () => {
    const Selected = useColorStore(state => state.Selected);
    const {styles, className} = GetBarImageStyle(Selected)
    return (
        <a href="../">
            <img className={className} src="/data/images/Olangutan.webp" />
            {styles}
        </a>
    )
}

const DrawTitle: FC = () =>
    <span>
        <b>Olangutan Analytics</b>
        <style jsx>{Title}</style>
    </span>

const ServerList: FC<State> = ({ value, setter }) =>
    <div>
        <DrawServerList
            value={value}
            setter={setter} />
        <style jsx>{ServerListStyles}</style>
    </div>

const TopBar = () => {
    const Router = useRouter();
    const Selected = useColorStore(state => state.Selected);
    const { styles, className } = GetBarStyle(Selected);

    // Spring stuff
    const pressed = useBurgerStore(state => state.pressed);
    const left  = pressed ? `20%` : `0.5%`;
    const spring = useSpring({paddingLeft: left});

    const [summonerName, setSummonerName] = useState("");
    const [serverRegion, setServerRegion] = useState("EUW");


    const HandleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Router.replace("/" + serverRegion + "/" + summonerName);
    }

    const ChangeInput = (e) => {
        setSummonerName(e.target.value);
    }

    return (
        <animated.div
            className={className}
            style={spring}>
            <BurgerButton />
            <DrawIcon />
            <DrawTitle />
            <form
                onSubmit={e => HandleForm(e)}
                className={className}>
                <input
                    className={"input is-rounded " + className}
                    type="text"
                    placeholder="Summoner Name"
                    onChange={ChangeInput}
                    maxLength={32}
                    value={summonerName} />
                <ServerList
                    value={serverRegion}
                    setter={setServerRegion} />
            </form>
            {styles}
        </animated.div>
    );
}

export default TopBar;