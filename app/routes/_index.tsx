import type { LoaderFunction } from "@remix-run/node";
import {  json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostsList } from "~/components/PostList";
import { getPostListings,  } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();
  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData();

  return ( 
    <div className="w-full">
      <div className="md:flex md:justify-between md:items-center">
        <h1>all posts</h1>
      </div>
      <PostsList
        posts={posts}
      />
    </div>
    );
}
