import type { Metadata } from "next";
import Projects from '@/components/home/Projects';

export const metadata: Metadata = {
  title: "Projects | Andhika Guntur - Digital Solutions & System Analysis",
  description: "Explore business process analysis, Software Requirements Specification (SRS/PRD), and digital solution projects developed by Andhika Guntur Ramadan.",
  keywords: [
    "Software Projects",
    "Business Process Analysis",
    "BPMN",
    "Requirements Engineering",
    "SRS",
    "PRD",
    "Andhika Guntur Portfolio"
  ],
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
