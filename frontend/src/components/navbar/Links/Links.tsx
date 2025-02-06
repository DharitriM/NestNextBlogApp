"use client";

import Navlink from "./navlinks/Navlink";

const links = [
  { title: "Home", path: "/" },
  { title: "Blogs", path: "/blog" },
  { title: "Profile", path: "/profile" },
  { title: "About", path: "/about" },
];
function Links() {
  const token = localStorage.getItem("authToken");
  return (
    <div className="flex gap-4">
      {links
        ?.filter((link) => link.title !== "Profile" || token)
        ?.map((link, index) => (
          <Navlink item={link} key={index}>
            {link.title}
          </Navlink>
        ))}
    </div>
  );
}
export default Links;
