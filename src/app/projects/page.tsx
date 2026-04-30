import type { Metadata } from "next";
import Projects from '@/components/home/Projects';

export const metadata: Metadata = {
  title: "Projects | Andhika Guntur - Software Showcase",
  description: "Explore a gallery of projects developed by Andhika Guntur, featuring web applications, APIs, and CLI tools built with modern technologies.",
  keywords: ["Software Projects", "React Projects", "Next.js Showcase", "Golang Backend", "Developer Portfolio"],
};

export default function ProjectsPage() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Project <span className="text-muted-foreground italic">Gallery</span>
                    </h1>
                </div>

                <Projects />
            </div>
        </div>
    );
}
