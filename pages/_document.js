import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    constructor() {
        super()
        this.state = {mode:'dark'};
    }
    render() {
        return (
            <Html>
                <Head />
                <body className={this.state.mode}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument