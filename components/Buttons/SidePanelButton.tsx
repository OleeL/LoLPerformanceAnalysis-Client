import { useColorStore, IColorScheme } from "../GlobalStyles";
import css from 'styled-jsx/css';
import create from "zustand";
import shallow from "zustand/shallow";
import { animated } from "react-spring";

type IButtonStore = {
    pressed: boolean;
    hovered: boolean;
    togglePressed: () => void;
    setHovered: (state: boolean) => void;
}

export const useButtonStore = create<IButtonStore>(set => ({
    pressed: false,
    hovered: false,
    togglePressed: () => set(s => ({ pressed: !s.pressed })),
    setHovered: (state: boolean) => set(({ hovered: state })),
}));

const GetCollectionStyle = (Selected: IColorScheme) => css.resolve`
    div {
        width: 80%;
        height: 40px;
        border: 1px solid ${Selected.input.borderColor};
        border-left: none;
        border-right: none;
        color: ${Selected.color};
        padding: 7px;
        text-align: center;
        margin-top: 10px;
    }

    span {

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

const SidePanelButton = ({children, onClick}, props) => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetCollectionStyle(Selected);
    const { togglePressed, setHovered } = useButtonStore(state => ({
        togglePressed: state.togglePressed,
        setHovered: state.setHovered
    }), shallow);


    const Click = () => togglePressed();
    const Hover = (e) => setHovered(true);
    const Unhover = (e) => setHovered(false);

    return (
        <animated.div
        {...props.style}
        onClick={onClick}
        className={className}
        onMouseEnter={Hover}
        onMouseLeave={Unhover}>
            {styles}
            {children}
        </animated.div>
    );
}

export default SidePanelButton;