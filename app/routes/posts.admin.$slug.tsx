import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { Response, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

type LoaderData = { post?: Post };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAdminUser(request);
  invariant(params.slug, "params.slug is required");
  if (params.slug === "new") {
    return json<LoaderData>({});
  }
  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ post });
};

export const action = async ({ request, params }: ActionArgs) => {
  await requireAdminUser(request);
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const summary = formData.get("summary");
  const markdown = formData.get("markdown");
  const intent = formData.get("intent");

  const errors = {
    title: title ? null : "Title is required ",
    slug: slug ? null : "Slug is required",
    summary: summary ? null : "Summary is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof summary === "string", "summary must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  if (intent == "create") {
    await createPost({ title, slug, summary, markdown });
  }
  invariant(params.slug, "params.slug must not be null");
  if (intent == "delete") {
    await deletePost(params.slug);
    return redirect("/posts/admin");
  }
  if (intent == "update") {
    await updatePost(params.slug, { title, slug, summary, markdown });
  }
  return redirect(`/posts/${slug}`);
};

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg text-black";

export default function NewPost() {
  const data = useLoaderData() as LoaderData;
  const errors = useActionData<typeof action>();
  const isNewPost = !data.post;

  return (
    <Form method="post" key={data.post?.slug ?? "new"}>
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            defaultValue={data.post?.title}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            defaultValue={data.post?.slug}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Summary:{" "}
          {errors?.summary ? (
            <em className="text-red-600">{errors.summary}</em>
          ) : null}
          <input
            type="text"
            name="summary"
            defaultValue={data.post?.summary}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={data.post?.markdown}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        {!isNewPost ? (
          <div>
            <button
              type="submit"
              className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300 m-2"
              name="intent"
              value="delete"
            >
              Delete Post
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              name="intent"
              value="update"
            >
              Update Posts
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            name="intent"
            value="create"
          >
            Create Posts
          </button>
        )}
      </p>
    </Form>
  );
}
