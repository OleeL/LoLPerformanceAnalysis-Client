import styled from 'styled-components';
import react from 'react';

const Bar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 50px;
    background-color: #00b0e0;
`

const TopBar = () => {


    return <Bar className="primary"></Bar>;
}

export default TopBar