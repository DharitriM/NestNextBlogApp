"use client";

import { fetchPosts } from "@/api/posts";
import Link from "next/link";
import { useQuery } from "react-query";

export default function PostsPage() {
  const { data: posts, isLoading, error } = useQuery("posts", fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            // onClick={() => router.push(`/blog/${post.id}`)} // Navigate to blog details page
          >
            <Link href={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-58 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {post.content}
                </p>
                <button className="text-blue-500 hover:underline text-sm">
                  Read more
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
