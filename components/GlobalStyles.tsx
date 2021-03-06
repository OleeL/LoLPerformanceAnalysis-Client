// styles/global.js
import css from 'styled-jsx/css'
import create from 'zustand';
import { setCookie } from '../Shared/Cookies';

export const Themes = [
    {
        name: "Light",
        primary: "#00b0e0",
        primaryInverted: "#ffffff",
        hover: "#000000",
        secondary: "#38545c",
        input: { color: "#303030", backgroundColor: "#ffffff", hoverColor: "#dfdfdf", borderColor: "#00b0e0", focusColor: "#00485c" } as IInputColors,
        backgroundColor: "#d1e0eb",
        color: "#ffffff",
        shadows: true
    } as IColorScheme,
    {
        name: "Dark",
        primary: "#00485c",
        primaryInverted: "#dddddd",
        hover: "#000000",
        secondary: "#303030",
        input: { color: "#ffffff", backgroundColor: "#303030", hoverColor: "#525252", borderColor: "#00485c", focusColor: "#00b0e0" } as IInputColors,
        backgroundColor: "#373a3e",
        color: "#ffffff",
        shadows: true
    } as IColorScheme,
    {
        name: "Darker",
        primary: "#3b3b3b",
        primaryInverted: "#dddddd",
        hover: "#000000",
        secondary: "#303030",
        input: { color: "#a49ea3", backgroundColor: "#303030", hoverColor: "#525252", borderColor: "#545454", focusColor: "#00b0e0" } as IInputColors,
        backgroundColor: "#303030",
        color: "#d1d1d1",
        shadows: false
    } as IColorScheme
]

export interface IInputColors {
    color: string;
    backgroundColor: string;
    hoverColor: string;
    borderColor: string;
    focusColor: string;
}

export interface IColorScheme {
    name: string;
    primary: string;
    primaryInverted: string;
    secondary: string;
    backgroundColor: string;
    input: IInputColors;
    color: string;
    hover: string;
    shadows: boolean;
}

export const GetTheme = (theme: string) => Themes.find(t => t.name === theme);

const mod = (n: number, m: number): number => ((n % m) + m) % m;

const Cycle = (n: number, max: number) => mod(n + 1, max);

const CycleStyle = (theme: IColorScheme): IColorScheme =>
    Themes[Cycle(Themes.findIndex(t => t === theme), Themes.length)];

type IColorStore = {
    Selected: IColorScheme;
    SetSelected: (theme: string) => void;
    Toggle: () => void;   
}

export const useColorStore = create<IColorStore>((set, get) => ({
    Selected: GetTheme("Darker") as IColorScheme,
    SetSelected: (theme: string) => set({ Selected: GetTheme(theme) }),
    Toggle: () => set(s => {
        const theme = CycleStyle(s.Selected);
        setCookie("theme", theme.name, 9999999);

        return ({ Selected: theme })
    }),
}));


const GlobalStyles = css.global`

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Regular.ttf') format('truetype');
        font-display: swap;
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Italic.ttf') format('truetype');
        font-display: swap;
        font-style: italic;
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Bold.ttf') format('truetype');
        font-display: swap;
        font-weight: bold;
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-BoldItalic.ttf') format('truetype');
        font-display: swap;
        font-style: italic;
        font-weight: bold;
    }

    html {
        overflow-y: auto;
        background-color: ${GetTheme("Dark").backgroundColor};
        
        font-family: 'IstokWeb', Arial;
        font-style: normal;
        position: fixed;
    }

    body {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
`


export default GlobalStyles;