import { routes } from "@remix-run/dev/server-build";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { generateSitemap } from "@nasa-gcn/remix-seo";
import { siteMetadata } from "~/siteMetadata";

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: siteMetadata.url,
  });
}
