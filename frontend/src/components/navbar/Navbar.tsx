import Link from "next/link";
import Links from "./Links/Links";

function Navbar() {
  //   const session = await auth();
  return (
    <div className="flex text-pretty items-center justify-between gap-10 top-0 px-5 py-6 bg-cyan-600 text-gray-900 h-21 border-b-2 border-gray-100">
      <Link
        href="/"
        className="text-5xl font-semibold font-serif text-cyan-900 hover:text-cyan-800 hover:cursor-pointer"
      >
        DM
      </Link>
      <Links />
    </div>
  );
}

export default Navbar;
