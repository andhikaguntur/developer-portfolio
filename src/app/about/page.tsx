'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import dudukPng from '@/assets/dudukpng.png';
import { useState, useRef, MouseEvent } from 'react';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

// The Interactive Spotlight Image Component
function SpotlightImage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
  
    return (
      <div 
        ref={containerRef}
        className="relative w-full max-w-sm h-[350px] md:h-[450px] mx-auto flex justify-center group mt-8 lg:mt-0 overflow-hidden rounded-2xl border border-border/40 bg-muted/10 shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Base Image: Grayscale */}
        <Image 
          src={dudukPng} 
          alt="Antigravity Profile Base" 
          fill
          className="object-cover object-top filter grayscale transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        
        {/* Colored Overlay Image with Radial Mask */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 250px at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
            maskImage: `radial-gradient(circle 250px at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
          }}
        >
          <Image 
            src={dudukPng} 
            alt="Antigravity Profile Colored" 
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        </div>
      </div>
    );
}

export default function AboutPage() {
    const [careerExpanded, setCareerExpanded] = useState(false);
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full"
                >
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


                </motion.div>

                {/* The large interactive framed photo takes up the right half of the about page */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 w-full flex justify-center"
                >
                    <SpotlightImage />
                </motion.div>

            </div>

            <div className="max-w-5xl mx-auto mt-32 space-y-24">
                {/* Career Section */}
                <section>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 border-b border-border/50 pb-4">
                        <Briefcase className="text-primary" size={28} />
                        Experience
                    </h2>
                    
                    <div className="bg-background border border-border/50 rounded-xl p-4 md:p-6 hover:border-border transition-colors shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
                                    <img src="https://ui-avatars.com/api/?name=P+I&background=random&color=fff&size=128" alt="Parto.id Logo" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Backend Golang Developer</h3>
                                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Pt. Affan Technology Indonesia (Parto.id)</p>
                                    
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-primary" />
                                            <span>Jul 2025 - Sep 2025 • 2 Mos</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-primary" />
                                            <span>Jambi, ID 🇮🇩</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-semibold text-foreground tracking-wide">
                                            <Briefcase size={14} className="text-primary" />
                                            <span>Internship • Hybrid</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setCareerExpanded(!careerExpanded)}
                                    className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                                >
                                    {careerExpanded ? 'Hide Details' : 'View Details'}
                                    {careerExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                <AnimatePresence>
                                    {careerExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 mt-4 border-t border-border/50 space-y-4">
                                                <div>
                                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2">Responsibilities</h4>
                                                    <ul className="space-y-1.5">
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Developed and maintained backend services using Golang for Parto.id's internal attendance application.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Implemented efficient data handling and secure API integrations to support daily attendance workflows.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Collaborated with frontend and product teams to ensure smooth functionality and seamless user experience.</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2">What I Learned</h4>
                                                    <ul className="space-y-1.5">
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Deepened understanding of Go's concurrency model and Clean Architecture within a production environment.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Gained hands-on experience in implementing Agile Scrum methodologies to streamline development workflows.</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Learned to collaborate effectively within a professional development team to achieve collective project goals.</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2">Impact</h4>
                                                    <ul className="space-y-1.5">
                                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <span>Developed core APIs for essential functionalities, including clock-in/out mechanisms and attendance reporting.</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 border-b border-border/50 pb-4">
                        <GraduationCap className="text-primary" size={28} />
                        Education
                    </h2>

                    <div className="bg-background border border-border/50 rounded-xl p-4 md:p-6 hover:border-border transition-colors shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
                                    <img src="https://ui-avatars.com/api/?name=U+J&background=random&color=fff&size=128" alt="Universitas Jambi Logo" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Universitas Jambi</h3>
                                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Bachelor's degree • Information Systems, (S.Kom)</p>
                                    <p className="text-xs font-semibold text-foreground mt-1 tracking-wide">GPA: 3.80 / 4.00</p>
                                    
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-primary" />
                                            <span>2022 - 2026</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-primary" />
                                            <span>Jambi, ID 🇮🇩</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
