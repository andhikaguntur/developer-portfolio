'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Box } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import projectsData from '@/data/projects.json';
import DetailModal from '@/components/shared/DetailModal';

interface ProjectsProps {
    limit?: number;
}

export default function Projects({ limit }: ProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const items = limit ? projectsData.slice(0, limit) : projectsData;

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
                            onClick={() => setSelectedProject(project)}
                            className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden card-hover cursor-pointer"
                        >
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                {project.image ? (
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                                        {project.title.split(' ').join('_')}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                            </div>

                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground shrink-0 ml-2">{project.year}</span>
                                </div>

                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                    {project.stack.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-muted/50 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.stack.length > 3 && (
                                        <span className="px-2 py-1 text-[10px] font-bold text-muted-foreground">+{project.stack.length - 3}</span>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:gap-4 transition-all">
                                        View Details <ArrowUpRight className="w-4 h-4" />
                                    </div>
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

            <DetailModal 
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title}
                description={selectedProject?.description}
                year={selectedProject?.year}
                stack={selectedProject?.stack}
                github={selectedProject?.github}
                live={selectedProject?.live}
                image={selectedProject?.image}
                icon={<Box size={24} />}
            />
        </section>
    );
}
