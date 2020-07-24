import { SignalRReconnect } from '../Shared/SignalR';
import { useStore } from '../Shared/Store';
import React, {useEffect} from 'react';
import GlobalStyles from '../components/GlobalStyles';
import "../sass/main.scss";

const MyApp = ({Component, pageProps, router}) => {

    const {setConnected} = useStore();
    const triggerConnected = (connected: boolean) => setConnected(connected);
    
    useEffect(() => {
        const html = document.getElementsByTagName('html');
        document.title = "Olangutan Analytics"
        if (router.query.region && router.query.summoner) {
            document.title = router.query.region + " - " + router.query.summoner;
        }
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
            <style jsx>{GlobalStyles}</style>
        </>
    )
};

export default MyApp