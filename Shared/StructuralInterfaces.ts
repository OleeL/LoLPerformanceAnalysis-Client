import css from 'styled-jsx/css';

export interface State {
    value?: string;
    setter?: (value: string) => void;
    className?: string;
    style?: {};
    jsxStyled?: any;
}