"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "@/components/navbar/Navbar";
import { usePathname, useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");
      const tokenExpiresAt = localStorage.getItem("tokenExpiration");
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      // if (!token) {
      //   window.location.reload();
      //   return;
      // }

      if (
        !token ||
        !tokenExpiresAt ||
        parseInt(tokenExpiresAt) <= currentTimeInSeconds
      ) {
        localStorage.clear();
        if (pathname !== "/") router.push("/");
        // window.location.reload();
      }
    };

    checkSession();

    const intervalId = setInterval(checkSession, 1000);
    return () => clearInterval(intervalId);
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
