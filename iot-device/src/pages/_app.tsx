import "@/styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useRouter } from "next/router";
import SessionProvider from "@/components/SessionProvider";

function App({ Component, pageProps }: AppProps & { session: any }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component key={router.asPath} {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;
