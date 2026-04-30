'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Trophy, Award, Briefcase, Star, Plus } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import achievementsData from '@/data/achievements.json';
import DetailModal from '@/components/shared/DetailModal';

const ICON_MAP = {
    Trophy: Trophy,
    Award: Award,
    Briefcase: Briefcase,
    Star: Star
};

interface AchievementsProps {
    limit?: number;
}

export default function Achievements({ limit }: AchievementsProps) {
    const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
    const items = limit ? achievementsData.slice(0, limit) : achievementsData;

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
                    {items.map((item, index) => {
                        const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Star;
                        
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => setSelectedAchievement(item)}
                                className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden card-hover cursor-pointer"
                            >
                                <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
                                    {item.image ? (
                                        <Image 
                                            src={item.image} 
                                            alt={item.title} 
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="text-primary/40 group-hover:scale-110 transition-transform duration-700">
                                            <IconComponent size={48} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                                </div>

                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground shrink-0 ml-2">{item.year}</span>
                                    </div>

                                    <div className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
                                        {item.organization}
                                    </div>

                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 flex-1 italic line-clamp-3">
                                        "{item.description}"
                                    </p>

                                    <div className="w-full pt-4 border-t border-border mt-auto">
                                        <div className="flex justify-between items-center">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                Verified Achievement
                                            </div>
                                            <Plus size={16} className="text-primary group-hover:rotate-90 transition-transform duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {limit && (
                    <div className="mt-16 text-center">
                        <Link href="/achievements" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-foreground border-b-2 border-foreground pb-2 hover:opacity-70 transition-opacity">
                            View Full Track Record
                        </Link>
                    </div>
                )}
            </div>

            <DetailModal 
                isOpen={!!selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
                title={selectedAchievement?.title}
                description={selectedAchievement?.description}
                year={selectedAchievement?.year}
                organization={selectedAchievement?.organization}
                github={selectedAchievement?.github}
                live={selectedAchievement?.live}
                image={selectedAchievement?.image}
                icon={selectedAchievement && React.createElement(ICON_MAP[selectedAchievement.icon as keyof typeof ICON_MAP] || Star, { size: 24 })}
            />
        </section>
    );
}
