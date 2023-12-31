import type { EntryContext, HandleDataRequestFunction } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { getEnv } from "./env.server";

global.ENV = getEnv();

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  );

  responseHeaders.set("Content-Type", "text/html");
  if (process.env.NODE_ENV !== "development") {
    responseHeaders.set("Cache-Control", "max-age=300, s-maxage=31556952");
  }

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

export const handleDataRequest: HandleDataRequestFunction = (
  response: Response,
) => {
  if (process.env.NODE_ENV !== "development") {
    response.headers.set("Cache-Control", "max-age=300, s-maxage=31556952");
  }
  return response;
};
