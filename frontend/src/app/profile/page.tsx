"use client";

import { getCurrentUser } from "@/api/auth";
import { getPostsByCurrentUser, getPostsByUser } from "@/api/posts";
import AddPostModal from "@/components/addEditPost/AddPostModal";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function ProfilePage() {
  const [postsByUser, setPostsByUser] = useState<any>([]);
  const [openAddPostModal, setOpenAddPostModal] = useState<boolean>(false);

  const { data: user } = useQuery("auth", getCurrentUser);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      if (user?.id) {
        // const posts = await getPostsByUser();
        const posts = await getPostsByCurrentUser()
        setPostsByUser(posts);
      }
    };
    fetchPostsByUser();
  }, [user, openAddPostModal]);

  return (
    <div className="min-h-screen p-6 text-gray-800">
      {/* User Details */}
      <div className="max-w-4xl mb-5 mx-auto bg-white p-6 rounded-lg shadow-lg">
        {user ? (
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Your Details</h1>
            <p>
              <strong>Name: </strong> {user?.name}
            </p>
            <p>
              <strong>Email: </strong> {user?.email}
            </p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>

      {/* User Posts Details */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* User Posts */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Your Posts</h2>

          {/* Add Post Button */}
          <button
            onClick={() => setOpenAddPostModal(true)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500"
          >
            Add Post
          </button>
        </div>

        {postsByUser.length > 0 ? (
          <ul className="space-y-4">
            {postsByUser.map((post: any) => (
              <li
                key={post.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
              >
                <div className="flex gap-5 w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p>{post.content}</p>
                    <div className="flex gap-2">
                      <p className="text-xs text-gray-500">
                        <b>Created At: </b>
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        <b>Updated At: </b>
                        {new Date(post.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found. Create your first post!</p>
        )}
      </div>
      <AddPostModal
        isOpen={openAddPostModal}
        onClose={() => setOpenAddPostModal(false)}
        author={user?.id}
      />
    </div>
  );
}
