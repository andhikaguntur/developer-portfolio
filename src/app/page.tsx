'use client';

import Hero from "@/components/home/Hero";
import GithubStats from "@/components/home/GithubStats";
import Comments from "@/components/home/Comments";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <Hero />
      <GithubStats />
      <Comments />
    </div>
  );
}

