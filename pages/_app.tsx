import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../app/globals.css";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
