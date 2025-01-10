"use client";

import Link from "next/link";

const Navlink = ({ item }: any) => {
  return (
    <Link
      href={item.path}
      className="border border-gray-800 px-3 py-2 rounded-md text-gray-900 hover:text-blue-200 hover:backdrop-brightness-50 hover:cursor-pointer hover:shadow-md hover:shadow-gray-900/30"
    >
      {item.title}
    </Link>
  );
};

export default Navlink;
