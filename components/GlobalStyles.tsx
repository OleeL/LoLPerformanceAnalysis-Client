// styles/global.js
import css from 'styled-jsx/css'
import create from 'zustand';

export interface IColorScheme {
    primary:         string,
    primaryInverted: string,
    secondary:       string,
    backgroundColor: string,
    color:           string
}

const Light: IColorScheme = {
    primary:         "#00b0e0",
    primaryInverted: "#ffffff",
    secondary:       "#38545c",
    backgroundColor: "#d1e0eb",
    color:           "#000000"  //black
}

const Dark: IColorScheme = {
    primary:         "#00485c",
    primaryInverted: "#DDDDDD",
    secondary:       "#303030",
    backgroundColor: "#373a3e",
    color:           "#ffffff"  //white
}

export const [useColorStore, _colorStore] = create (set => ({
    Selected: Dark,
}));

export type State = ReturnType<typeof _colorStore.getState>;

const GlobalStyles = css.global`
    body {
        margin: 0;
        width: 100%;
        height: 100%;
        font-family: 'rimini', sans-serif;
    }

    @font-face {
        font-family: "rimini";
        src: url("rimini.otf") format("opentype");
    }

    html {
        overflow-y: auto;
        background-color: ${Dark.backgroundColor};
        min-width: 0px;
    }
`


export default GlobalStyles;