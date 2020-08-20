import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                <link rel="apple-touch-icon" sizes="57x57" href="/data/favicons/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/data/favicons/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/data/favicons/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/data/favicons/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/data/favicons/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/data/favicons/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/data/favicons/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/data/favicons/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/data/favicons/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192"  href="/data/favicons/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/data/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/data/favicons/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/data/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/data/favicons/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content="LoL Analysis and Statistics. Track your progress, check your summoner - live or recorded"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument