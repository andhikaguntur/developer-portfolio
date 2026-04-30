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
    Instagram,
    Linkedin,
    Bot,
    Sparkles
} from 'lucide-react';

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/andhikaguntur', icon: Github },
    { name: 'Instagram', href: 'https://instagram.com/andhikaguntur', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

import avatarImage from '../../assets/ppporto.jpg';
import { useLoading } from '@/context/LoadingContext';

const TypewriterEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isDeleting && index < text.length) {
                setDisplayedText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            } else if (isDeleting && index > 0) {
                setDisplayedText(prev => prev.slice(0, -1));
                setIndex(prev => prev - 1);
            } else if (index === text.length) {
                setTimeout(() => setIsDeleting(true), 3000);
            } else if (index === 0 && isDeleting) {
                setIsDeleting(false);
            }
        }, isDeleting ? 70 : 150);
        return () => clearTimeout(timeout);
    }, [index, isDeleting, text]);

    return (
        <span className="inline-block min-h-[1.2em]">
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-[0.9em] bg-primary align-middle ml-1"
            />
        </span>
    );
};

function CyclingButton() {
    const phrases = ["Let's Connect", "Build Magic", "Crafting Experiences", "Shape The Future"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(i => (i + 1) % phrases.length), 3500);
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


function MiniMochika() {
    return (
        <motion.div
            initial={{ y: 80, x: -20, rotate: 20, scale: 0.8 }}
            animate={{ y: -20, x: 20, rotate: 5, scale: 1 }}
            exit={{ y: 80, x: -20, rotate: 20, scale: 0.8 }}
            transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                mass: 0.8
            }}
            className="absolute top-0 right-0 z-0 w-24 h-24 pointer-events-none"
        >
            {/* Speech Bubble */}
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-12 left-0 bg-foreground text-background text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl border border-border z-30"
            >
                Peek-a-boo! ✨
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-foreground rotate-45" />
            </motion.div>

            {/* Mochika Body - Identical to FloatingChat version */}
            <div className="w-20 h-20 bg-gradient-to-b from-white via-zinc-100 to-zinc-300 rounded-2xl border border-white/60 shadow-[0_10px_20px_rgba(0,0,0,0.2),inset_0_-8px_16px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(255,255,255,0.9)] relative flex items-center justify-center overflow-visible">
                
                {/* Antenna */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-5 bg-zinc-400 rounded-full origin-bottom">
                    <div className="absolute -top-1.5 -left-[3px] w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </div>

                {/* Face / Visor */}
                <div className="w-[50px] h-[30px] bg-zinc-900 rounded-[12px] flex items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-gradient-to-b from-white/20 to-transparent rounded-b-full blur-[1px]" />
                    
                    {/* Glowing Eyes */}
                    <div className="flex gap-2.5">
                        <div className="w-[7px] h-[11px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
                        <div className="w-[7px] h-[11px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
                    </div>
                </div>

                {/* Blushing cheeks */}
                <div className="absolute bottom-4 left-4 w-2 h-1 bg-pink-400/40 rounded-full blur-[1px]" />
                <div className="absolute bottom-4 right-4 w-2 h-1 bg-pink-400/40 rounded-full blur-[1px]" />
            </div>
        </motion.div>
    );
}

export default function Hero() {
    const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
    const { isDone } = useLoading();

    return (
        <section className="w-full min-h-[80vh] flex justify-center py-12 md:py-20">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">

                {/* Left Sidebar (Profile Info) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isDone ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full md:w-[320px] shrink-0 flex flex-col gap-6"
                >


                    {/* Profile Avatar */}
                    <div className="relative w-48 md:w-full max-w-[260px] mx-auto md:mx-0">
                        <motion.div
                            onMouseEnter={() => setIsHoveringAvatar(true)}
                            onMouseLeave={() => setIsHoveringAvatar(false)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-full aspect-square rounded-full overflow-hidden border border-border/40 shadow-sm bg-muted/10 group z-10"
                        >
                            <Image
                                src={avatarImage}
                                alt="Andhika Guntur Avatar"
                                fill
                                sizes="(max-width: 768px) 192px, 260px"
                                className="object-cover transition-all duration-500 filter hover:grayscale-0 grayscale"
                            />
                        </motion.div>
                        <AnimatePresence>
                            {isHoveringAvatar && <MiniMochika />}
                        </AnimatePresence>
                    </div>

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
                            <a href="mailto:andhikaguntur77.ag@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">andhikaguntur77.ag@gmail.com</a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Area (Summary & Skills) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isDone ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
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
                                    Skills <span className="text-muted-foreground italic">Overview</span>
                                </h2>
                            </div>
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
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2.5 px-4 py-2.5 border border-border rounded-xl transition-all cursor-default bg-background shadow-sm hover:bg-muted"
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
                                            whileHover={{ scale: 1.05 }}
                                            className="px-5 py-2.5 text-sm font-bold tracking-wide border border-border bg-muted/30 rounded-xl text-foreground transition-all cursor-default shadow-sm hover:border-primary hover:text-primary"
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
