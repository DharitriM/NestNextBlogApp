"use client";

import LoginRegisterModal from "@/components/login/LoginModal";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") || ""
      : "";

  const [open, setOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (token) {
      // Log out logic
      localStorage.clear();
      window.location.reload(); // Refresh page to update UI
    } else {
      // Log in logic
      setOpen(true);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gray-800 text-gray-100">
        {/* Login/Logout Button */}
        <div className="absolute px-10 py-8 flex items-center justify-between w-full">
          {!token && (
            <p className="left-6 font-mono">
              Want to add to edit blog ? Then login and proceed...
            </p>
          )}
          <div className="absolute top-10 right-10">
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 border border-cyan-600 bg-gray-700 text-white rounded-md shadow hover:bg-cyan-600 hover:shadow-lg"
            >
              {token ? "Log out" : "Please login"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex flex-col gap-6 items-center justify-center">
              <h1 className="text-pretty text-4xl tracking-tight text-blue-100 sm:text-5xl hover:cursor-default">
                Welcome to{" "}
                <b className="font-bold hover:text-blue-300">NEXT-NEST</b>{" "}
                Blogging
              </h1>
              <p className="text-pretty text-xl tracking-tight text-blue-200 sm:text-xl font-mono">
                A blog application created using nestjs and nextjs
              </p>
            </div>
          </main>

          {/* Footer */}
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-blue-200">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Next.js
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              © 2025 NEXT-NEST.
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://docs.nestjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Nest.js
            </a>
          </footer>
        </div>
        {open && (
          <LoginRegisterModal open={open} onClose={() => setOpen(false)} />
        )}
      </div>
    </>
  );
}
