// styles/global.js
import css from 'styled-jsx/css'
import create from 'zustand';

export interface IColorScheme {
    name?: string,
    primary?: string,
    primaryInverted?: string,
    secondary?: string,
    backgroundColor?: string,
    color?: string
}

const Themes = [
    {
        name: "Light",
        primary: "#00b0e0",
        primaryInverted: "#ffffff",
        secondary: "#38545c",
        backgroundColor: "#d1e0eb",
        color: "#000000"
    } as IColorScheme,
    {
        name: "Dark",
        primary: "#00485c",
        primaryInverted: "#DDDDDD",
        secondary: "#303030",
        backgroundColor: "#373a3e",
        color: "#ffffff"
    } as IColorScheme
]

const GetTheme = (theme: string) => Themes.find(t => t.name === theme);

const mod = (n: number, m: number): number => ((n % m) + m) % m;

const Cycle = (n: number, max: number) => mod(n + 1, max);

const CycleStyle = (theme: IColorScheme): IColorScheme => {
    console.log(Cycle(Themes.findIndex(t => t.name === theme), Themes.length));
    console.log("switching from", Themes[Themes.findIndex(t => t === theme)]?.name)
    return Themes[Cycle(Themes.findIndex(t => t === theme), Themes.length)];
}

export const [useColorStore, _colorStore] = create((set, get) => ({
    Selected: GetTheme("Dark") as IColorScheme,
    Toggle: () => set(s => ({Selected: CycleStyle(s.Selected)}))
}));

export type State = ReturnType<typeof _colorStore.getState>;

const GlobalStyles = css.global`

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Italic.ttf') format('truetype')
        font-style: italic;
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-Bold.ttf') format('truetype')
        font-weight: bold;
    }

    @font-face {
        font-family: 'IstokWeb';
        src: url('/data/fonts/IstokWeb-BoldItalic.ttf') format('truetype');
        font-style: italic;
        font-weight: bold;
    }  

    html {
        overflow-y: auto;
        background-color: ${GetTheme("Dark").backgroundColor};
        min-width: 0px;
        
        font-family: 'IstokWeb';
        font-style: normal;
    }

    body {
        margin: 0;
        width: 100%;
        height: 100%;
    }
`


export default GlobalStyles;