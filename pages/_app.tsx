import React, {useEffect} from 'react'
import {createGlobalStyle} from "styled-components"
import { StoreProvider, useStore } from '../Shared/StoreContext';


import {AppProps} from 'next/app'
import '../sass/main.scss'
import handleConnection from '../Shared/SignalR';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
`;
const MyApp = (props: AppProps<{}>) => {
    
    useEffect(() => {
        const store = useStore();

        const html = document.getElementsByTagName('html');
        if (html && html.length > 0) {
            html[0].setAttribute('lang', 'en');
        }

        const timer = setTimeout(async () => {
            await handleConnection();
        });
        

        return () => clearTimeout(timer)
        
    }, []);


    const {Component, pageProps} = props;

    return (
        <StoreProvider>
            
            <GlobalStyles/>
            <Component {...pageProps} />
        </StoreProvider>
    )
};

export default MyApp