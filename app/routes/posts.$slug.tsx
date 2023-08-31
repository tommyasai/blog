import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
import ReactMarkdown from "react-markdown";
import { siteMetadata } from "~/siteMetadata";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ post });
};

export const meta: MetaFunction = ({ data }) => {
  const { title, image } = data.post;
  const summary = "Temp summary";
  const postImage = `${siteMetadata.url}${image}`;

  return [
    { title: title },
    { name: "description", content: summary },
    { property: "og:title", content: title },
    { property: "og:description", content: summary },
    { property: "og:image", content: postImage },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: summary },
    { name: "twitter:image", content: postImage },
  ];
};

export default function PostSlug() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-full">
      <h1 className="m-0 border-b-2 text-center text-2xl">{post.title}</h1>
      <div className="text-right mb-4">
        Published: {post.createdAt} <br />
        Updated: {post.updatedAt}
      </div>
      <article className="prose sm:prose-xl md:prose-xl lg:prose-xl dark:prose-invert">
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </article>
    </main>
  );
}
