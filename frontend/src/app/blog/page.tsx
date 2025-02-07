"use client";

import { fetchPosts } from "@/api/posts";
import Link from "next/link";
import { useQuery } from "react-query";
import { FaAngleRight } from "react-icons/fa";

export default function PostsPage() {
  const { data: posts, isLoading, error } = useQuery("posts", fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <div className="mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-cyan-200 hover:shadow-md transition-shadow duration-300"
          >
            <Link href={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {post.content}
                </p>
                <button
                  className="text-cyan-500 flex items-center gap-1 border border-cyan-500 px-3 hover:bg-cyan-500 hover:text-white py-2 rounded-md text-sm"
                  onClick={() => console.log("View details")}
                >
                  View Details
                  <FaAngleRight />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
