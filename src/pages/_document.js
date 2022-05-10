import Document, { Html, Head, Main, NextScript } from "next/document";
const db = process.env.db;

class MyDocument extends Document {
  render() {
    console.log(db);
    return (
      <Html>
        <Head>
          <>
            {db === "test" ? (
              <>
                <meta
                  httpEquiv="Cache-control"
                  content="no-cache, no-store, must-revalidate"
                />
                <meta httpEquiv="Pragma" content="no-cache" />
              </>
            ) : (
              false
            )}
          </>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Mulish:wght@400;500&family=Nunito:wght@400;500&family=Open+Sans&family=Poppins:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
