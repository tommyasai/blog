import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { Response, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Post, createPost, getPost, updatePost } from "~/models/post.server";
import { requireAdminUser } from "~/session.server";

type LoaderData = { post?: Post }

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAdminUser(request);
  invariant(params.slug, "params.slug is required")
  if (params.slug === 'new') {
    return json<LoaderData>({})
  }
  const post = await getPost(params.slug);

  invariant(post, `Post not found: ${params.slug}`);
  return json<LoaderData>({post})
}

export const action = async ({ request, params }: ActionArgs) => {
  await requireAdminUser(request)
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = {
    title: title ? null: "Title is required ",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required"
  }

  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json(errors)
  }

  invariant(
    typeof title === "string",
    "title must be a string",
  )
  invariant(
    typeof slug === "string",
    "slug must be a string",
  )
  invariant(
    typeof markdown === "string",
    "markdown must be a string",
  )
  if (params.slug === 'new') {
    await createPost({ title, slug, markdown });
  } else {
    invariant(
      params.slug,
      "params.slug must not be null",
    )
    await updatePost(params.slug, { title, slug, markdown })
  }

  return redirect("/posts/admin");
};

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";

export default function NewPost() {
  const data = useLoaderData() as LoaderData;
  const errors = useActionData<typeof action>();
  const isNewPost = !data.post

  return (
    <Form method="post" key={data.post?.slug ?? 'new'}>
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
             <em className="text-red-600">{errors.title}</em>
          ): null}
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
          ): null}
          <input
            type="text"
            name="slug"
            defaultValue={data.post?.slug}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: 
        {errors?.markdown ? (
          <em className="text-red-600">{errors.markdown}</em>
        ): null}
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
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          {isNewPost ? "Create Post" : "Update Post"}s
        </button>
      </p>
    </Form>
  );
}

