import { SignalRReconnect } from '../Shared/SignalR';
import React, {useEffect} from 'react';
import App from 'next/app';
import GlobalStyles from '../components/GlobalStyles';

const MyApp = ({Component, pageProps}) => {
    
    useEffect(() => {
        // const store = useStore();

        const html = document.getElementsByTagName('html');
        if (html && html.length > 0) {
            html[0].setAttribute('lang', 'en');
        }
        const timer = setTimeout(async () => {
            // await SignalRReconnect(store);
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