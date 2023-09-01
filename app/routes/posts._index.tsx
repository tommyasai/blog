import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";
import { PostsList } from "~/components/PostList";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  return json<LoaderData>({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main className="w-full">
      <div className="md:flex md:justify-between md:items-center">
        <h1>Posts</h1>
      </div>
      <PostsList posts={posts} />
    </main>
  );
}
