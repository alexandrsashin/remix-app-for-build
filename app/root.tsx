import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import theme from "./src/theme";
import { useContext } from "react";
import ClientStyleContext from "./src/ClientStyleContext";
import { withEmotionCache } from "@emotion/react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap",
    },
  ];
};

const App = withEmotionCache((_, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="google-site-verification"
          content="TbMJPmoGDh8iQHaPY1DwAwe79VJoUAu-gJgo2VDRdVI"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="app">
          <div className="app__content-wrapper">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default App;
