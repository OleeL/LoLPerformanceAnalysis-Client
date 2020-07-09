import { StoreProvider, useStore } from '../Shared/StoreContext';
import { SignalRReconnect } from '../Shared/SignalR';
import React, {useEffect} from 'react';
import AppProps from 'next/app';
import GlobalStyles from '../components/GlobalStyles';

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
            <Component {...pageProps} />
            <style jsx global>
                {GlobalStyles}
            </style>
        </StoreProvider>
    )
};

export default MyApp