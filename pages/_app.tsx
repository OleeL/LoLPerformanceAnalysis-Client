import { SignalRReconnect } from '../Shared/SignalR';
import React, {useEffect} from 'react';
import GlobalStyles from '../components/GlobalStyles';
import "../sass/main.scss";
import { useStore } from '../Shared/Store';

const MyApp = ({Component, pageProps}) => {

    const {setConnected} = useStore();

    const triggerConnected = (connected: boolean) => setConnected(connected);
    
    useEffect(() => {
        const html = document.getElementsByTagName('html');
        if (html && html.length > 0) {
            html[0].setAttribute('lang', 'en');
        }
        const timer = setTimeout(async () => {
            await SignalRReconnect(triggerConnected);
        });

        return () => clearTimeout(timer)
        
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <style jsx global>
                {GlobalStyles}
            </style>
        </>
    )
};

export default MyApp