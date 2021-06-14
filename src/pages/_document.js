import Document, { Html, Head, Main, NextScript } from 'next/document';
import { dom } from '@fortawesome/fontawesome-svg-core';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <style type="text/css">{dom.css()}</style>
                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
                </Head>
                <body className="bg-white text-gray-700 font-mono">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
