import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeftSidebar } from "@/components/LeftSidebar";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cleverly - Advanced AI Research & Deployment",
  description: "Pioneering AI research and deployment solutions for a smarter future.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body className="min-h-screen antialiased bg-black">
        <AuthProvider>
          <LeftSidebar />
          <main className="pl-48">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
