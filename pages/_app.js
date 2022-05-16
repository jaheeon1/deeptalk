import { wrapper } from "@/modules/store";
import React from 'react';
// import "@/styles/main.scss";


function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);