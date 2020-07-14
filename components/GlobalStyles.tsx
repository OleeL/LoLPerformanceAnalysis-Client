// styles/global.js
import css from 'styled-jsx/css'
import create from 'zustand';

export interface IColorScheme {
    primary:         string,
    secondary:       string,
    backgroundColor: string,
    color:           string
}

const Light: IColorScheme = {
    primary:         "#00b0e0",
    secondary:       "#38545c",
    backgroundColor: "#d1e0eb",
    color:           "#000000"  //black
}

const Dark: IColorScheme = {
    primary:         "#00485c",
    secondary:       "#38545c",
    backgroundColor: "#52646f",
    color:           "#ffffff"  //white
}

export const [useColorStore, _colorStore] = create (set => ({
    Selected: Dark,
}));

export type State = ReturnType<typeof _colorStore.getState>;

const GlobalStyles = css.global`
    body {
        margin: 0;
    }

    html {
        overflow-y: auto;
        background-color: ${Dark.backgroundColor};
    }
`


export default GlobalStyles;