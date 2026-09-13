import type { Metadata } from "next";
import { GraduationCap, Briefcase } from 'lucide-react';
import { SpotlightImage, ExperienceList, EducationList, AnimatedAboutSection } from '@/components/about/AboutClient';
import aboutData from '@/data/about.json';

export const metadata: Metadata = {
    title: "About | Andhika Guntur - Aspiring IT Business Analyst",
    description: "Learn more about Andhika Guntur Ramadan's journey as an Information Systems undergraduate at UPN \"Veteran\" Yogyakarta, focusing on Business Process Analysis, Requirements Engineering, Database Systems, and Digital Solutions.",
    keywords: [
        "About Andhika Guntur",
        "Andhika Guntur Ramadan",
        "Information Systems",
        "Aspiring IT Business Analyst",
        "IT Business Analyst Intern",
        "UPN Veteran Yogyakarta",
        "Requirements Engineering",
        "BPMN",
        "System Design"
    ],
};

export default function AboutPage() {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

                <AnimatedAboutSection>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
                        About <span className="text-muted-foreground italic">Me</span>
                    </h1>

                    <div className="space-y-6 text-lg md:text-xl text-foreground font-light leading-relaxed border-l-4 border-primary pl-6">
                        <p>
                            I am an <strong className="font-semibold text-foreground">Information Systems undergraduate at UPN &quot;Veteran&quot; Yogyakarta</strong> (GPA 3.85 / 4.00) and an <strong className="font-semibold text-primary">aspiring IT Business Analyst</strong> with a keen interest in digital solution development.
                        </p>
                        <p>
                            I focus on bridging business requirements and technical execution—applying business process modeling with <strong className="font-medium text-foreground">BPMN</strong>, formulating structured <strong className="font-medium text-foreground">SRS & PRD</strong> specifications, designing relational database schemas, and understanding scalable web architectures.
                        </p>
                        <p>
                            Through active academic leadership as Head of Academic & Professional Development at HIMASISFO and practical mentorship as a Laboratory Assistant, I continuously strengthen my analytical thinking, stakeholder communication, and problem-solving abilities.
                        </p>
                    </div>
                </AnimatedAboutSection>

                <div className="flex-1 w-full flex justify-center">
                    <SpotlightImage />
                </div>

            </div>

            <div className="max-w-5xl mx-auto mt-32 space-y-24">
                {/* Career / Organizational Experience Section */}
                <section>
                    <h2 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3 border-b border-border/50 pb-4">
                        <Briefcase className="text-primary" size={28} />
                        Work & Organizational Experience
                    </h2>
                    
                    <ExperienceList items={aboutData.experience} />
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3 border-b border-border/50 pb-4">
                        <GraduationCap className="text-primary" size={28} />
                        Education
                    </h2>

                    <EducationList items={aboutData.education} />
                </section>
            </div>
        </div>
    );
}
