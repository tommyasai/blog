import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";
import { formatTimestampsInObject } from "~/utils/date";

export type { Post };
export async function getPostListings() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      title: true,
      summary: true,
      createdAt: true,
    },
  });
  return posts.map((post) => formatTimestampsInObject(post, ["createdAt"]));
}

export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts.map((post) =>
    formatTimestampsInObject(post, ["createdAt", "updatedAt"]),
  );
}

export async function getPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } });
  return formatTimestampsInObject(post, ["createdAt", "updatedAt"]);
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "summary" | "markdown">,
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  slug: string,
  post: Pick<Post, "slug" | "title" | "summary" | "markdown">,
) {
  return prisma.post.update({ data: post, where: { slug: slug } });
}
export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug: slug } });
}
