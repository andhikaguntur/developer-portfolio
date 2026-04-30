'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Terminal,
    Database,
    Server,
    Layout,
    Smartphone,
    Globe,
    Box,
    Cpu,
    Cloud,
    Layers,
    MapPin,
    Briefcase,
    Mail,
    Github,
    Twitter,
    Linkedin
} from 'lucide-react';

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/andhikaguntur', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

import avatarImage from '../../assets/ppporto.jpg';

// Looping Typewriter Effect
function TypewriterEffect({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!isDeleting && index < text.length) {
            timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[index]);
                setIndex(index + 1);
            }, 150);
        } else if (isDeleting && index > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(prev => prev.slice(0, -1));
                setIndex(index - 1);
            }, 100);
        } else if (index === text.length) {
            timeout = setTimeout(() => setIsDeleting(true), 4000); // Wait 4 seconds before deleting
        } else if (index === 0 && isDeleting) {
            timeout = setTimeout(() => setIsDeleting(false), 500); // Brief pause before typing again
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting, text]);

    return (
        <span className="inline-block">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[4px] h-[0.9em] bg-primary align-middle ml-1"
            />
        </span>
    );
}

// Elegant Cycling Text
function CyclingButton() {
    const phrases = ["Let's Connect", "Build Magic", "Crafting Experiences", "Shape The Future"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <div className="flex items-center justify-center md:justify-start relative h-6 overflow-hidden w-full cursor-default">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 10, opacity: 0, filter: "blur(2px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -10, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-primary"
                >
                    {phrases[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="w-full min-h-[80vh] flex justify-center py-12 md:py-20">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">

                {/* Left Sidebar (Profile Info) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-[320px] shrink-0 flex flex-col gap-6"
                >


                    {/* Profile Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-48 md:w-full max-w-[260px] mx-auto md:mx-0 aspect-square rounded-full overflow-hidden border border-border/40 shadow-sm bg-muted/10"
                    >
                        <Image
                            src={avatarImage}
                            alt="Andhika Guntur Avatar"
                            fill
                            sizes="(max-width: 768px) 192px, 260px"
                            className="object-cover transition-all duration-500 filter hover:grayscale-0 grayscale"
                        />
                    </motion.div>

                    <div className="flex flex-col gap-1 text-center md:text-left min-h-[4rem]">
                        <h1 className="text-3xl lg:text-4xl font-black font-heading tracking-tighter text-foreground whitespace-nowrap">
                            <TypewriterEffect text="Andhika Guntur" />
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-muted/30 hover:bg-muted border border-border/50 hover:border-border transition-all text-muted-foreground hover:text-foreground hover:-translate-y-1"
                                    aria-label={social.name}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Button */}
                    <CyclingButton />

                    {/* Bio / Small Stats */}
                    <div className="text-sm text-foreground flex flex-col gap-4 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3 group cursor-default">
                            <Briefcase size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-foreground font-medium group-hover:text-primary transition-colors">Software Engineer</span>
                        </div>
                        <div className="flex items-center gap-3 group cursor-default">
                            <MapPin size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-foreground font-medium group-hover:text-primary transition-colors">Earth, Internet</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <Mail size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            <a href="mailto:hello@antigravity.dev" className="text-foreground font-medium hover:text-primary transition-colors">hello@antigravity.dev</a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-8 text-sm text-muted-foreground pt-6 border-t border-border/50">
                        <motion.span whileHover={{ y: -2 }} className="flex flex-col items-center md:items-start cursor-pointer group">
                            <span className="font-black font-heading text-2xl text-foreground group-hover:text-primary transition-colors">5</span>
                            <span className="text-xs uppercase tracking-widest font-semibold">Yrs Exp</span>
                        </motion.span>
                        <motion.span whileHover={{ y: -2 }} className="flex flex-col items-center md:items-start cursor-pointer group">
                            <span className="font-black font-heading text-2xl text-foreground group-hover:text-primary transition-colors">30+</span>
                            <span className="text-xs uppercase tracking-widest font-semibold">Projects</span>
                        </motion.span>
                    </div>
                </motion.div>

                {/* Right Area (Summary & Skills) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 flex flex-col gap-16 mt-12 md:mt-0"
                >
                    {/* Small Summary Paragraph */}
                    <div className="space-y-6">
                        <div className="mb-6">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                Professional <span className="text-muted-foreground italic">Overview</span>
                            </h2>
                        </div>
                        <motion.div
                            whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
                            className="bg-background border border-border/60 rounded-3xl p-8 shadow-md transition-all"
                        >
                            <p className="text-foreground text-xl font-light leading-relaxed border-l-4 border-primary pl-6">
                                I am a passionate software engineer specializing in building elegant, user-centric web applications. I bridge the gap between design and robust functionality, ensuring every digital experience is performant, accessible, and beautifully crafted. My professional journey spans across various industries, where I've delivered scalable architectures and engaging user interfaces.
                            </p>
                        </motion.div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-6">
                        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                    Technical <span className="text-muted-foreground italic">Skills</span>
                                </h2>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary cursor-pointer transition-colors font-bold pb-1">Customize Stack</span>
                        </div>

                        <div className="flex flex-col gap-8">
                            {/* Hard Skills */}
                            <motion.div
                                whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
                                className="border border-border/60 rounded-3xl p-8 transition-all bg-background shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black font-heading text-primary tracking-tight">Hard Skills</h3>
                                    <span className="text-[10px] px-3 py-1 bg-muted text-foreground rounded-full uppercase tracking-widest font-bold">Technical</span>
                                </div>
                                <p className="text-base text-muted-foreground mb-8">Languages, frameworks, and tools I use daily to build robust systems.</p>

                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: 'TypeScript', icon: Terminal },
                                        { name: 'React', icon: Layout },
                                        { name: 'Next.js', icon: Globe },
                                        { name: 'Node.js', icon: Server },
                                        { name: 'PostgreSQL', icon: Database },
                                        { name: 'Docker', icon: Box },
                                        { name: 'AWS', icon: Cloud },
                                        { name: 'TailwindCSS', icon: Layers },
                                        { name: 'Python', icon: Cpu },
                                        { name: 'React Native', icon: Smartphone },
                                    ].map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--muted))' }}
                                            className="flex items-center gap-2.5 px-4 py-2.5 border border-border rounded-xl transition-colors cursor-default bg-background shadow-sm"
                                        >
                                            <skill.icon size={18} className="text-primary" />
                                            <span className="text-sm font-semibold text-foreground tracking-wide">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Soft Skills */}
                            <motion.div
                                whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
                                className="border border-border/60 rounded-3xl p-8 transition-all bg-background shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black font-heading text-emerald-500 tracking-tight">Soft Skills</h3>
                                    <span className="text-[10px] px-3 py-1 bg-muted text-foreground rounded-full uppercase tracking-widest font-bold">Interpersonal</span>
                                </div>
                                <p className="text-base text-muted-foreground mb-8">Abilities that help me collaborate, lead, and adapt in dynamic environments.</p>

                                <div className="flex flex-wrap gap-3">
                                    {[
                                        'Problem Solving',
                                        'Communication',
                                        'Team Leadership',
                                        'Time Management',
                                        'Adaptability',
                                        'Critical Thinking',
                                        'Agile Methodology'
                                    ].map((skill) => (
                                        <motion.span
                                            key={skill}
                                            whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                                            className="px-5 py-2.5 text-sm font-bold tracking-wide border border-border bg-muted/30 rounded-xl text-foreground transition-colors cursor-default shadow-sm"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
