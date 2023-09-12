import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost, getPostListings } from "~/models/post.server";
import ReactMarkdown from "react-markdown";
import { siteMetadata } from "~/siteMetadata";
import type { SEOHandle } from "@balavishnuvj/remix-seo";
import twitterLogo from "../assets/x.png";
import { useEffect, useState } from "react";
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
  const { title, summary } = data.post;
  const postImage = `${siteMetadata.image}`;

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

  const [twitterShareURL, setTwitterShareURL] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTwitterShareURL(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          post.title,
        )}&url=${encodeURIComponent(window.location.href)}&via=${
          siteMetadata.twitter
        }`,
      );
    }
  }, [post]);

  return (
    <main className="mx-auto max-w-full">
      <div className="flex justify-between">
        <a href={twitterShareURL} target="_blank" rel="noopener noreferrer">
          <img
            src={twitterLogo}
            alt="Tweet this post"
            width="24"
            height="24"
            className="dark:invert"
          />
        </a>
        <div className="text-right">
          Published: {post.createdAt} <br />
          Updated: {post.updatedAt}
        </div>
      </div>

      <div className="flex items-center mb-4">
        <h1 className="flex-grow text-center border-b-2 m-0 text-2xl">
          {post.title}
        </h1>
      </div>

      <article className="prose sm:prose-xl md:prose-xl lg:prose-xl dark:prose-invert">
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </article>
    </main>
  );
}
