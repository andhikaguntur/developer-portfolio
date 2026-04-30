'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import dudukPng from '@/assets/dudukpng.png';
import { useState, useRef, MouseEvent } from 'react';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

// The Interactive Spotlight Image Component
export function SpotlightImage() {
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
        <Image 
          src={dudukPng} 
          alt="Andhika Guntur Profile Base" 
          fill
          className="object-cover object-top filter grayscale transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        
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
            alt="Andhika Guntur Profile Colored" 
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        </div>
      </div>
    );
}

export function ExperienceCard({ 
    title, company, logo, period, location, type, responsibilities, learnings, impact 
}: { 
    title: string, company: string, logo: string, period: string, location: string, type: string,
    responsibilities: string[], learnings: string[], impact: string[]
}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-background border border-border/50 rounded-xl p-4 md:p-6 hover:border-border transition-colors shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
                        <img src={logo} alt={company} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1">
                    <div>
                        <h3 className="text-lg font-bold text-foreground">{title}</h3>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">{company}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-primary" />
                                <span>{period}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-primary" />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold text-foreground tracking-wide">
                                <Briefcase size={14} className="text-primary" />
                                <span>{type}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setExpanded(!expanded)}
                        className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                    >
                        {expanded ? 'Hide Details' : 'View Details'}
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                        {expanded && (
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
                                            {responsibilities.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2">What I Learned</h4>
                                        <ul className="space-y-1.5">
                                            {learnings.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground mb-2">Impact</h4>
                                        <ul className="space-y-1.5">
                                            {impact.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export function EducationCard({ 
    school, degree, gpa, logo, period, location 
}: { 
    school: string, degree: string, gpa: string, logo: string, period: string, location: string 
}) {
    return (
        <div className="bg-background border border-border/50 rounded-xl p-4 md:p-6 hover:border-border transition-colors shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex items-center justify-center border border-border">
                        <img src={logo} alt={school} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1">
                    <div>
                        <h3 className="text-lg font-bold text-foreground">{school}</h3>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">{degree}</p>
                        <p className="text-xs font-semibold text-foreground mt-1 tracking-wide">GPA: {gpa}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-primary" />
                                <span>{period}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-primary" />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ExperienceList({ items }: { items: any[] }) {
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? items : items.slice(0, 2);

    return (
        <motion.div layout className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
                {displayedItems.map((exp, index) => (
                    <motion.div
                        key={exp.title + index}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                        transition={{ 
                            duration: 0.4, 
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                    >
                        <ExperienceCard {...exp} />
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {items.length > 2 && (
                <motion.button 
                    layout
                    onClick={() => setShowAll(!showAll)}
                    className="mx-auto px-6 py-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group mt-2"
                >
                    <span>
                        {showAll ? 'Show Less' : 'View More'}
                    </span>
                    <motion.div
                        animate={{ rotate: showAll ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        <ChevronDown size={14} className="group-hover:scale-110 transition-transform" />
                    </motion.div>
                </motion.button>
            )}
        </motion.div>
    );
}

export function EducationList({ items }: { items: any[] }) {
    const [showAll, setShowAll] = useState(false);
    const displayedItems = showAll ? items : items.slice(0, 2);

    return (
        <motion.div layout className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
                {displayedItems.map((edu, index) => (
                    <motion.div
                        key={edu.school + index}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                        transition={{ 
                            duration: 0.4, 
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                    >
                        <EducationCard {...edu} />
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {items.length > 2 && (
                <motion.button 
                    layout
                    onClick={() => setShowAll(!showAll)}
                    className="mx-auto px-6 py-2 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group mt-2"
                >
                    <span>
                        {showAll ? 'Show Less' : 'View More'}
                    </span>
                    <motion.div
                        animate={{ rotate: showAll ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        <ChevronDown size={14} className="group-hover:scale-110 transition-transform" />
                    </motion.div>
                </motion.button>
            )}
        </motion.div>
    );
}

export function AnimatedAboutSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
        >
            {children}
        </motion.div>
    );
}
