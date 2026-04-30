import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Comments from "@/components/home/Comments";

export const metadata: Metadata = {
  title: "Andhika Guntur | Full-Stack Developer & Software Engineer",
  description: "Explore the professional portfolio of Andhika Guntur, a Full-Stack Developer specializing in React, Next.js, and Golang. Delivering elegant digital experiences.",
  keywords: ["Full-Stack Developer", "Software Engineer", "React", "Next.js", "Golang", "Web Development", "Portfolio"],
  openGraph: {
    title: "Andhika Guntur | Full-Stack Developer",
    description: "Professional portfolio showcasing modern web applications and technical expertise.",
    url: "https://andhikaguntur.dev", // Replace with actual URL if known
    siteName: "Andhika Guntur Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Replace with actual image path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <Hero />
      <Comments />
    </div>
  );
}

