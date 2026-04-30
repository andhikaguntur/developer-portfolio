import type { Metadata } from "next";
import Achievements from '@/components/home/Achievements';

export const metadata: Metadata = {
  title: "Achievements | Andhika Guntur - Milestones",
  description: "A comprehensive look at the professional achievements, certifications, and academic success of Andhika Guntur.",
  keywords: ["Achievements", "Milestones", "Certifications", "Software Engineer Success"],
};

export default function AchievementsPage() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        All <span className="text-muted-foreground italic">Milestones</span>
                    </h1>
                </div>

                <Achievements />
            </div>
        </div>
    );
}
