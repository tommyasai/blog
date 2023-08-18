import {
  Outlet,
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
import ReactMarkdown from "react-markdown";

export default function PostRoute() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError() as unknown;
  const params = useParams();
  let errorMessage;
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <article className="prose lg:prose-xl">
        <ReactMarkdown>
          {`Ooops! **${params.slug}** does not exist!`}
        </ReactMarkdown>
      </article>
    );
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="text-red-500">
      Oh, something went wrong!
      <pre>{errorMessage}</pre>
    </div>
  );
}
