import styled from 'styled-components';
import react from 'react';

const Bar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 55px;
    background-color: #00b0e0;
    color: white;
    display: inline;
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    overflow: hidden;
`

const BarImage = styled.img`
    width: 50px;
    height: 50px;
    left: 0;
    border-radius: 100%;
    margin: 2px 1px 1px 25px;
    box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.5);
    vertical-align: middle;
    display: inline;
`

const Title = styled.span`
    color: white;
    top: 0px;
    left: 0px;
    margin: 10px;
    vertical-align: middle;
    display: inline;
`

const Input = styled.input`
    display: inline;
    overflow: hidden;
    margin: 5px 5px 5px 10px;
    width: 50vw;

`

const TopBar = () => {


    return <Bar className="primary">
        <a href="../">
            <BarImage src="/data/images/Olangutan.jpg" />
        </a>
        <Title className="title">
            Olangutan Analytics
        </Title>
        <Input className="input is-rounded" type="text" placeholder="Summoner Name" />
    </Bar>;
}

export default TopBar