import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost, getPostListings } from "~/models/post.server";
import ReactMarkdown from "react-markdown";
import { siteMetadata } from "~/siteMetadata";
import { SEOHandle } from "@balavishnuvj/remix-seo";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Something went wrong" }];
  }
  const { title, summary, image } = data.post;
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

export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const posts = await getPostListings();
    return posts.map((post) => {
      return { route: `/posts/${post.slug}`, priority: 0.7 };
    });
  },
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
