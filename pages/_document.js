import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return ( 
            <Html>
                <Head>

                {/* Compiled and minified css */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

                {/* Compiled and minified JavaScrip */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            
                    <body>
                        <Main />
                        <NextScript />
                       
                    </body>
                </Head>
            </Html>
        )
    }
}

export default MyDocument;