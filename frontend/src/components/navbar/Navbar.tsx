import Link from "next/link";
import Links from "./Links/Links";

function Navbar() {
  //   const session = await auth();
  return (
    <div className="flex text-pretty items-center justify-between gap-10 sticky top-0 px-5 py-6 bg-blue-400 text-gray-900 h-21">
      <Link
        href="/"
        className="text-5xl font-semibold font-serif text-slate-50"
      >
        DM
      </Link>
      <Links />
    </div>
  );
}

export default Navbar;
