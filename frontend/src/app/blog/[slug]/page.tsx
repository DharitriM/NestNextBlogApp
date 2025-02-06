import { fetchPostById } from "@/api/posts";

export default async function PostDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = parseInt(params.slug);
  const post = await fetchPostById(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <a href="/blog" className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Posts
      </a>
      <h1 className="text-3xl font-bold my-4">{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <p className="text-sm text-gray-500">
        Created At: {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Last Updated: {new Date(post.updatedAt).toLocaleString()}
      </p>
      <p className="text-gray-100 my-6 text-lg font-serif">{post.content}</p>
    </div>
  );
}
