import '../styles/urbit-sans.css'
import "@urbit/foundation-design-system/styles/markdown.css"
import "@urbit/foundation-design-system/styles/globals.css"
import '../styles/globals.css'
import { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process?.env?.NEXT_PUBLIC_MATOMO_URL || "";
const MATOMO_SITE_ID = process?.env?.NEXT_PUBLIC_MATOMO_SITE_ID || "";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
    });
  });
  return <Component {...pageProps} />
}

export default MyApp
