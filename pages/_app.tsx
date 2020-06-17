import { StoreProvider, useStore } from '../Shared/StoreContext';
import { SignalRReconnect } from '../Shared/SignalR';
import {createGlobalStyle} from "styled-components";
import React, {useEffect} from 'react';
import {AppProps} from 'next/app';

import 'mobx-react-lite/batchingForReactDom';
import '../sass/main.scss';

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
            await SignalRReconnect(store);
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