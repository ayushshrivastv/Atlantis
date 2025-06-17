"use client";

import Image from "next/image";
import Link from "next/link";

export default function OpenAPIAIPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/d97f3c7611e4bd3907cb33615f88909c.jpg"
              alt="OpenAPI AI Logo"
              width={600}
              height={450}
              priority
              className="mx-auto rounded-lg shadow-lg max-w-full"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white mb-4">OpenAPI AI</h1>
            <p className="text-gray-300 text-lg">
              Your intelligent climate data analysis assistant
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
