import type { Post } from "~/models/post.server";
import { Card } from "./Card";

interface Props {
  posts: Pick<Post, "createdAt" | "slug" | "title">[];
}

export const PostsList = ({
  posts,
}: Props) => {
  return (
    <div className="prose-h3:mb-0 lg:prose-h3:mb-0 prose-p:my-2 lg:prose-p:my-2">
      {posts.length >= 1 ? (
        <>
          <div className="not-prose sm:flex flex-wrap">
            {posts.map((post, index) => (
              <div key={post.slug} className="sm:w-1/2 mb-12">
                <div className={index % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}>
                  <Card {...post} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="not-prose sm:flex flex-wrap">
          <h3>No results</h3>
        </div>
      )}
    </div>
  );
};