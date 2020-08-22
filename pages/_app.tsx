import { SignalRReconnect } from '../Shared/SignalR';
import React, {useEffect} from 'react';
import GlobalStyles, { useColorStore, GetTheme } from '../components/GlobalStyles';
import "../sass/main.scss";
import { getCookie } from '../Shared/Cookies';

const MyApp = ({Component, pageProps, router}) => {
    const SetSelected: (theme: string) => void =
        useColorStore(state => state.SetSelected);
    
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
            await SignalRReconnect();
        });
        
        const theme = getCookie("theme")
        if (theme) {
            SetSelected(theme);
        }

        return () => clearTimeout(timer);
        
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{GlobalStyles}</style>
        </>
    )
};

export default MyApp