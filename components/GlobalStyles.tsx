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
    secondary:       "#38545c",
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
    }

    html {
        overflow-y: auto;
        background-color: ${Dark.backgroundColor};
        min-width: 0px;
    }
`


export default GlobalStyles;