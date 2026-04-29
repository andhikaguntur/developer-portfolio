'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';



const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive analytics dashboard for online retailers, featuring real-time data visualization and inventory management.",
        stack: ["Next.js", "TypeScript", "Tremor", "Supabase"],
        link: "https://github.com",
        year: "2024"
    },
    {
        title: "Social Graph API",
        description: "High-performance backend service for mapping social connections using graph database technology.",
        stack: ["Node.js", "Neo4j", "Docker", "Redis"],
        link: "https://github.com",
        year: "2023"
    },
    {
        title: "Aesthetic Portfolio V1",
        description: "My previous portfolio site exploring brutalist design trends and WebGL interactions.",
        stack: ["React", "Three.js", "Tailwind"],
        link: "https://github.com",
        year: "2023"
    },
    {
        title: "TaskFlow CLI",
        description: "A command-line interface tool for developer productivity, managing local tasks and git workflows.",
        stack: ["Rust", "Clap", "Tokio"],
        link: "https://github.com",
        year: "2022"
    }
];

import Link from 'next/link';

interface ProjectsProps {
    limit?: number;
}

export default function Projects({ limit }: ProjectsProps) {
    const items = limit ? projects.slice(0, limit) : projects;

    return (
        <section id="projects" className="section-padding bg-background">
            <div className="container-wide">
                {limit && (
                    <div className="mb-12">
                        <span className="text-muted-foreground text-sm uppercase tracking-widest mb-4 block">
                            Selected Work &mdash; 02
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            Featured <span className="text-muted-foreground italic">Projects.</span>
                        </h2>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden card-hover"
                        >
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs">
                                    PROJECT_MOCKUP
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                            </div>

                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground shrink-0 ml-2">{project.year}</span>
                                </div>

                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                    {project.stack.map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-muted/50 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:gap-4 transition-all"
                                    >
                                        Explore <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="mt-24 text-center">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-foreground border-b-2 border-foreground pb-2 hover:opacity-70 transition-opacity">
                            Explore All Work Gallery
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}


