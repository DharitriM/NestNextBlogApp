"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    // Fetch current logged-in user details
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch posts created by the user
    const fetchPosts = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    // Redirect to add post page or open modal
    console.log("Add post button clicked");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* User Details */}
        {user ? (
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}

        {/* Add Post Button */}
        <button
          onClick={handleAddPost}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500"
        >
          Add Post
        </button>

        {/* User Posts */}
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts?.map((post: any) => (
              <li
                key={post.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found. Create your first post!</p>
        )}
      </div>
    </div>
  );
}
