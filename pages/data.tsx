import React, { useState, useEffect, FormEvent } from "react";
import styled from 'styled-components';

const Page = styled.div`
    padding: 30vh 0;
`;

const Title = styled.h1`
    text-align: center;
    margin: 20px;
`

const SummonerInput = styled.input`
    margin: 0px 0px 10px;
`


const index = () => {
    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>My custom Bulma website</title>
                <link rel="stylesheet" href="css/mystyles.css"/>
            </head>
            <body>
                <h1 className="title">
                    Bulma
                </h1>

                <p className="subtitle">
                    Modern CSS framework based on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">Flexbox</a>
                </p>

                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="Input"/>
                    </div>
                </div>

                <div className="field">
                    <p className="control">
                    <span className="select">
                        <select>
                        <option>Select dropdown</option>
                        </select>
                    </span>
                    </p>
                </div>

                <div className="buttons">
                    <a className="button is-primary">Primary</a>
                    <a className="button is-link">Link</a>
                </div>
            </body>
        </>
    )
}
export default index;

