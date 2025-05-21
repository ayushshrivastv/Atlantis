"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="NexusAI Logo"
            width={32}
            height={32}
          />
          <span className="font-bold text-xl tracking-tight">NexusAI</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Research
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:grid-cols-2 bg-black/95">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 no-underline outline-none focus:shadow-md"
                        href="/research"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Research Overview
                        </div>
                        <p className="text-sm leading-tight text-zinc-400">
                          Explore our latest breakthroughs and ongoing projects
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/research/publications" title="Publications">
                    Our latest papers and findings
                  </ListItem>
                  <ListItem href="/research/frameworks" title="Frameworks">
                    Open-source tools and methodologies
                  </ListItem>
                  <ListItem href="/research/team" title="Research Team">
                    Meet our talented researchers
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:grid-cols-2 bg-black/95">
                  <ListItem href="/products/nexus-suite" title="Nexus Suite">
                    Enterprise AI platform
                  </ListItem>
                  <ListItem href="/products/nexus-vision" title="Nexus Vision">
                    Computer vision solutions
                  </ListItem>
                  <ListItem href="/products/nexus-language" title="Nexus Language">
                    Advanced language models
                  </ListItem>
                  <ListItem href="/products/nexus-api" title="Nexus API">
                    Integrate our AI into your products
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:grid-cols-2 bg-black/95">
                  <ListItem href="/about/mission" title="Our Mission">
                    Building AI for human benefit
                  </ListItem>
                  <ListItem href="/about/team" title="Our Team">
                    The people behind NexusAI
                  </ListItem>
                  <ListItem href="/about/ethics" title="Ethics & Safety">
                    Our approach to responsible AI
                  </ListItem>
                  <ListItem href="/about/partners" title="Partners">
                    Organizations we work with
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Careers
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:grid-cols-2 bg-black/95">
                  <ListItem href="/careers/openings" title="Open Positions">
                    Join our diverse team
                  </ListItem>
                  <ListItem href="/careers/culture" title="Our Culture">
                    What it's like to work here
                  </ListItem>
                  <ListItem href="/careers/benefits" title="Benefits">
                    What we offer to our team
                  </ListItem>
                  <ListItem href="/careers/internships" title="Internships">
                    Opportunities for students
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent"}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-900">
            Sign In
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            Try Demo
          </Button>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 focus:bg-gray-800",
            className
          )}
          href={href}
          {...props}
        >
          <div className="text-sm font-medium text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
