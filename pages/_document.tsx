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
                    <link rel="apple-touch-icon" sizes="180x180" href="/data/favicons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/data/favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/data/favicons/favicon-16x16.png" />
                    <link rel="manifest" href="/data/favicons/site.webmanifest" />
                    <link rel="mask-icon" href="/data/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                    <link rel="shortcut icon" href="/data/favicons/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#2b5797" />
                    <meta name="msapplication-config" content="/data/favicons/browserconfig.xml" />
                    <meta name="theme-color" content="#ffffff" />
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