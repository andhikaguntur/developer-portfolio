'use client';

import React from 'react';
import { motion } from "framer-motion";
import { Trophy, Award, Briefcase, Star, LucideProps } from "lucide-react";
import Link from 'next/link';

const ACHIEVEMENTS = [
    {
        id: 1,
        year: "2025",
        title: "Hackathon Winner",
        organization: "Global AI Challenge",
        description: "Built an accessibility tool using computer vision.",
        icon: <Trophy size={20} />
    },
    {
        id: 2,
        year: "2024",
        title: "Senior Developer Certification",
        organization: "Tech Institute",
        description: "Advanced certification in full-stack architecture.",
        icon: <Award size={20} />
    },
    {
        id: 3,
        year: "2023",
        title: "Open Source Contributor",
        organization: "Major Framework",
        description: "Contributed core performance fixes to a popular React library.",
        icon: <Star size={20} />
    },
    {
        id: 4,
        year: "2022",
        title: "Best UI/UX Design",
        organization: "Web Awards",
        description: "Recognition for outstanding interface design in fintech.",
        icon: <Briefcase size={20} />
    }
];

interface AchievementsProps {
    limit?: number;
}

export default function Achievements({ limit }: AchievementsProps) {
    const items = limit ? ACHIEVEMENTS.slice(0, limit) : ACHIEVEMENTS;

    return (
        <section id="achievements" className="section-padding bg-background">
            <div className="container-wide">
                {limit && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Featured <span className="text-muted-foreground italic">Milestones.</span>
                        </h2>
                        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent w-full" />
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden card-hover"
                        >
                            <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
                                <div className="text-primary/40 group-hover:scale-110 transition-transform duration-700">
                                    {React.cloneElement(item.icon as React.ReactElement<LucideProps>, { size: 48 })}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                            </div>

                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground shrink-0 ml-2">{item.year}</span>
                                </div>

                                <div className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
                                    {item.organization}
                                </div>

                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 flex-1 italic">
                                    "{item.description}"
                                </p>

                                <div className="w-full pt-4 border-t border-border mt-auto">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        Verified Achievement
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {limit && (
                    <div className="mt-16 text-center">
                        <Link href="/achievements" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-foreground border-b-2 border-foreground pb-2 hover:opacity-70 transition-opacity">
                            View Full Track Record
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
