import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import * as gtag from "~/utils/gtags.client";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { getEnv } from "./env.server";
import { useEffect } from "react";
import { isDarkMode } from "./utils/darkMode";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  ENV: ReturnType<typeof getEnv>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
    ENV: getEnv(),
  });
};

export default function App() {
  const location = useLocation();
  const data = useLoaderData();
  const gaTrackingId = data.ENV.GA_TRACKING_ID;

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  useEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const flexClasses = "flex flex-col items-center";
  const spacingClasses =
    "px-4 md:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto h-[100vh]";
  const proseClasses = "prose lg:prose-xl dark:prose-invert";

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <head>
        <Links />
      </head>
      <body
        className={`dark:bg-slate-900 overflow-y-scroll ${proseClasses} ${flexClasses} ${spacingClasses}`}
      >
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTrackingId}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        )}
        <LiveReload />
      </body>
    </html>
  );
}
