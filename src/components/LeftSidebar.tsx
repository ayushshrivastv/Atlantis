"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { OpenAPILogo } from "@/components/OpenAPILogo";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Documentation", href: "/documentation" },
  { name: "OpenAPI AI", href: "/openapi-ai" },
  { name: "News", href: "/news" },
];

export function LeftSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed left-0 top-0 h-full w-48 py-6 px-4 bg-black flex flex-col">
      <Link href="/" className="flex items-center justify-center mb-8 px-2">
        <OpenAPILogo width={140} height={40} className="mx-auto" />
      </Link>

      <nav className="flex-1">
        <ul className="space-y-0.5">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between py-1.5 px-2 text-white text-sm hover:bg-gray-900/30 rounded-md transition-colors group",
                  hoveredItem === item.name && "bg-gray-900/50"
                )}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{item.name}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={cn(
                    "transition-opacity duration-300",
                    hoveredItem === item.name ? "opacity-100" : "opacity-0"
                  )}
                >
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6">
        <Link
          href="/help"
          className="flex items-center justify-between py-1.5 px-2 text-white/70 text-sm hover:text-white hover:bg-gray-900/30 rounded-md transition-colors group"
          onMouseEnter={() => setHoveredItem("help")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span>Help Center</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(
              "transition-opacity duration-300",
              hoveredItem === "help" ? "opacity-100" : "opacity-0"
            )}
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
        <Link
          href="/account"
          className="flex items-center justify-between py-1.5 px-2 text-white/70 text-sm hover:text-white hover:bg-gray-900/30 rounded-md transition-colors group"
          onMouseEnter={() => setHoveredItem("account")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span>Account</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(
              "transition-opacity duration-300",
              hoveredItem === "account" ? "opacity-100" : "opacity-0"
            )}
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
