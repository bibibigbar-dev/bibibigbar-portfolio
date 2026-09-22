interface PostFormProps {
  action: (formData: FormData) => Promise<void>;
  boardSlug: string;
  title?: string;
  content?: string;
  postId?: string;
  submitLabel: string;
  heading: string;
}

export function PostForm({
  action,
  boardSlug,
  title = "",
  content = "",
  postId,
  submitLabel,
  heading,
}: PostFormProps) {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl surface rounded-[2rem] p-6 sm:p-8">
        <h1 className="display text-3xl font-bold text-[var(--sky-deep)]">{heading}</h1>
        <form action={action} className="mt-6 grid gap-4">
          <input type="hidden" name="boardSlug" value={boardSlug} />
          {postId ? <input type="hidden" name="postId" value={postId} /> : null}
          <label className="field">
            <span>Title</span>
            <input name="title" required defaultValue={title} placeholder="Share a helpful title" />
          </label>
          <label className="field">
            <span>Content</span>
            <textarea
              name="content"
              required
              defaultValue={content}
              placeholder="Write your tip, question, or story…"
            />
          </label>
          <button type="submit" className="btn btn-primary w-fit">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
