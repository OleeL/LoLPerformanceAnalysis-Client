import { SignalRReconnect } from '../Shared/SignalR';
import { useStore } from '../Shared/Store';
import React, {useEffect} from 'react';
import GlobalStyles, { ChangeGlobalStyles, useColorStore, GetTheme } from '../components/GlobalStyles';
import "../sass/main.scss";

const MyApp = ({Component, pageProps, router}) => {

    const {setConnected} = useStore();
    const triggerConnected = (connected: boolean) => setConnected(connected);
    const { SetSelected } = useColorStore();
    
    useEffect(() => {
        const html = document.getElementsByTagName('html');
        document.title = "Olangutan Analytics";
        if (router.query.region && router.query.summoner) {
            document.title = router.query.region + " - " + router.query.summoner;
        }
        if (html && html.length > 0) {
            html[0].setAttribute('lang', 'en');
        }
        const timer = setTimeout(async () => {
            await SignalRReconnect(triggerConnected);
        });
        if (GetTheme(document.cookie)) SetSelected(document.cookie);

        return () => clearTimeout(timer);
        
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <ChangeGlobalStyles />
            <style jsx>{GlobalStyles}</style>
        </>
    )
};

export default MyApp