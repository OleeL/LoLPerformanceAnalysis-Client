import { useColorStore, IColorScheme } from "../GlobalStyles";
import css from 'styled-jsx/css';
import create from "zustand";
import shallow from "zustand/shallow";

export const [useBurgerStore] = create(set => ({
    pressed: false,
    hovered: false,
    togglePressed: () => set(s => ({ pressed: !s.pressed })),
    setHovered: (state: boolean) => set(({ hovered: state })),
}));

const GetCollectionStyle = (Selected: IColorScheme) => css.resolve`
    a {
        margin: 5px;
    }

    div {

    }

    hr {

    }
`;
const TorchStyle = css`
    div {
        position: absolute;
        overflow: hidden;

        background: rgba(228,228,228, 0.5);
        background: radial-gradient(
            circle,
            rgba(228,228,228,1)
            0%,
            rgba(148,148,148,1)
            51%,
            rgba(0,0,0,1)
            100%
        );
    }
`

const SidePanelButton = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetCollectionStyle(Selected);
    const { togglePressed, setHovered } = useBurgerStore(state => ({
        togglePressed: state.togglePressed,
        setHovered: state.togglePressed
    }), shallow);


    const Click = () => togglePressed();
    const Hover = (e) => setHovered(true);
    const Unhover = (e) => setHovered(false);

    return (
        <a
            onClick={Click}
            className={className}
            onMouseEnter={Hover}
            onMouseLeave={Unhover}>
            {styles}
        </a>
    );
}

export default SidePanelButton;