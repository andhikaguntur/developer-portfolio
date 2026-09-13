import type { Metadata } from "next";
import Achievements from '@/components/home/Achievements';

export const metadata: Metadata = {
    title: "Achievements | Andhika Guntur - Certifications & Honors",
    description: "Explore the professional certifications (BNSP Junior Web Developer), hackathons (COMPFEST, Refactory x UGM), and academic achievements of Andhika Guntur Ramadan.",
    keywords: [
        "Achievements",
        "BNSP Certification",
        "Junior Web Developer",
        "COMPFEST Data Analytic Dash",
        "Refactory Hackathon",
        "Andhika Guntur"
    ],
};

export default function AchievementsPage() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Learning <span className="text-muted-foreground italic">Experiences</span>
                    </h1>
                </div>

                <Achievements />
            </div>
        </div>
    );
}
