"use client";

import { getCurrentUser } from "@/api/auth";
import { getPostsByCurrentUser } from "@/api/posts";
import AddPostModal from "@/components/addEditPost/AddPostModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BsFileEarmarkPost } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";

export default function ProfilePage() {
  const [postsByUser, setPostsByUser] = useState<any>([]);
  const [openAddPostModal, setOpenAddPostModal] = useState<boolean>(false);

  const { data: user } = useQuery("auth", getCurrentUser);

  useEffect(() => {
    const fetchPostsByUser = async () => {
      if (user?.id) {
        // const posts = await getPostsByUser();
        const posts = await getPostsByCurrentUser();
        setPostsByUser(posts);
      }
    };
    fetchPostsByUser();
  }, [user, openAddPostModal]);

  return (
    <div
      className="min-h-screen p-6 text-gray-800"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp11079741.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" min-h-[80vh] p-10 mx-[100px] my-5 bg-white bg-opacity-20 border border-gray-500 rounded-lg flex items-start justify-center gap-10">
        {/* User Details */}
        <div className="w-[400px] bg-white rounded-xl shadow-lg overflow-hidden text-center relative">
          {/* Background Image */}
          <div
            className="relative h-[150px] w-full"
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/previews/048/399/170/non_2x/dark-turquoise-corporate-background-with-glowing-lights-vector.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0.6",
            }}
          ></div>

          {/* Profile Image */}
          <div className="absolute top-[6rem] left-1/2 transform -translate-x-1/2 z-10">
            <img
              src={
                user?.avatar ||
                "https://static.vecteezy.com/system/resources/previews/048/399/170/non_2x/dark-turquoise-corporate-background-with-glowing-lights-vector.jpg"
              }
              alt="User Avatar"
              className="w-[7rem] h-[7rem] object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="mt-14 flex flex-col items-center pb-4 font-serif">
            <h2 className="mt-2 text-xl font-semibold uppercase text-cyan-800">
              {user?.name || "John Doe"}
            </h2>
            <p className="text-gray-600 text-sm ">
              {user?.email || "email@example.com"}
            </p>
            <p className="text-gray-600 text-sm">
              {user?.location || "Location not set"}
            </p>
          </div>

          {/* Statistics Section */}
          <div className="flex justify-between px-8 py-4 border-t">
            <div className="text-center">
              <p className="text-lg font-bold text-cyan-800">80K</p>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <PiUsersThreeFill />
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-cyan-800">803K</p>
              <p className="text-gray-500 text-xs flex items-center gap-1 ">
                <BiSolidLike />
                Likes
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-cyan-800">
                {postsByUser.length}
              </p>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <BsFileEarmarkPost />
                Posts
              </p>
            </div>
          </div>
        </div>

        {/* User Posts Details */}
        <div className="max-w-3xl w-full bg-cyan-50 bg-opacity-40 border border-gray-500 p-6 rounded-lg shadow-lg">
          {/* User Posts */}
          <div className="mb-2 flex flex-row items-center justify-between">
            <h2 className="text-2xl text-white font-semibold mb-4">
              Posts By You
            </h2>

            {/* Add Post Button */}
            <button
              onClick={() => setOpenAddPostModal(true)}
              className="px-4 py-2 border bg-white border-cyan-600 text-cyan-600 rounded-md shadow hover:bg-cyan-600 hover:shadow-lg hover:text-white transition-shadow duration-300"
            >
              Add Post
            </button>
          </div>

          {postsByUser.length > 0 ? (
            <ul className="space-y-4">
              {postsByUser.map((post: any) => (
                <li
                  key={post.id}
                  className="p-4 bg-cyan-50 border border-gray-200 rounded-md shadow-sm"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="flex gap-5 w-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-28 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-lg font-bold font-mono underline">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-light">
                          {post.content}
                        </p>
                        <div className="flex gap-5 mt-1">
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
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white font-serif text-center">
              No posts found. Create your first post!
            </p>
          )}
        </div>
      </div>
      <AddPostModal
        isOpen={openAddPostModal}
        onClose={() => setOpenAddPostModal(false)}
        author={user?.id}
      />
    </div>
  );
}
