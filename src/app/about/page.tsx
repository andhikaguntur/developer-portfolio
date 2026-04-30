import type { Metadata } from "next";
import { GraduationCap, Briefcase } from 'lucide-react';
import { SpotlightImage, ExperienceList, EducationList, AnimatedAboutSection } from '@/components/about/AboutClient';
import aboutData from '@/data/about.json';

export const metadata: Metadata = {
    title: "About | Andhika Guntur - Full-Stack Developer",
    description: "Learn more about Andhika Guntur's journey, professional experience in Golang and React, and academic background in Information Systems.",
    keywords: ["About Andhika Guntur", "Developer Experience", "Golang Developer", "Universitas Jambi", "Software Engineer Bio"],
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
                            I am a dedicated Full-Stack Developer with a passion for creating immersive digital experiences. My approach combines technical rigor with a keen eye for design, ensuring that every project is not only functional but also emotionally resonant.
                        </p>
                        <p>
                            With years of experience in the modern web ecosystem, I've mastered tools like React, Next.js, and Node.js. I believe in continuous learning and often spend my time experimenting with new frameworks or contributing to open-source projects.
                        </p>
                    </div>
                </AnimatedAboutSection>

                <div className="flex-1 w-full flex justify-center">
                    <SpotlightImage />
                </div>

            </div>

            <div className="max-w-5xl mx-auto mt-32 space-y-24">
                {/* Career Section */}
                <section>
                    <h2 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3 border-b border-border/50 pb-4">
                        <Briefcase className="text-primary" size={28} />
                        Experience
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
