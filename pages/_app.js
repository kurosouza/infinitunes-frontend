import { Grommet, grommet as grommetTheme } from "grommet";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["500", "700"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <Grommet theme={grommetTheme}>
        <Component {...pageProps} />
      </Grommet>
    </>
  );
}
