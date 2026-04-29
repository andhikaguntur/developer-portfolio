'use client';

import { motion } from 'framer-motion';
import { GitCommit, Star, GitPullRequest } from 'lucide-react';

export default function GithubStats() {
    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div>
                        <span className="text-muted-foreground text-xs uppercase tracking-widest block font-bold mb-3">
                            Section &mdash; 03
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-sm leading-none text-foreground">
                            Open <span className="text-primary italic">Source</span>
                        </h2>
                    </div>
                    <a
                        href="https://github.com/andhikaguntur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors mt-4 md:mt-0"
                    >
                        @andhikaguntur
                    </a>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-background p-6 border border-border">
                        <GitCommit className="w-6 h-6 text-foreground mb-4" />
                        <div className="text-4xl font-bold text-foreground mb-1">1,204</div>
                        <div className="text-sm text-muted-foreground">Commits this year</div>
                    </div>
                    <div className="bg-background p-6 border border-border">
                        <GitPullRequest className="w-6 h-6 text-foreground mb-4" />
                        <div className="text-4xl font-bold text-foreground mb-1">86</div>
                        <div className="text-sm text-muted-foreground">Pull Requests</div>
                    </div>
                    <div className="bg-background p-6 border border-border">
                        <Star className="w-6 h-6 text-foreground mb-4" />
                        <div className="text-4xl font-bold text-foreground mb-1">342</div>
                        <div className="text-sm text-muted-foreground">Stars earned</div>
                    </div>
                    <div className="bg-background p-6 border border-border flex flex-col justify-between">
                        <span className="text-sm text-muted-foreground">Top Languages</span>
                        <div className="flex gap-2 mt-4">
                            <div className="h-2 w-1/2 bg-foreground rounded-full" />
                            <div className="h-2 w-1/4 bg-neutral-400 rounded-full" />
                            <div className="h-2 w-1/4 bg-neutral-200 rounded-full" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>TS</span>
                            <span>Rust</span>
                            <span>Go</span>
                        </div>
                    </div>
                </div>

                {/* Mock Contribution Graph - Minimalist */}
                <div className="mt-12 flex gap-1 justify-center flex-wrap opacity-50">
                    {Array.from({ length: 52 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }).map((_, j) => {
                                const isForeground = ((i * 17 + j * 31) % 100) > 70;
                                return (
                                    <div
                                        key={j}
                                        className={`w-3 h-3 rounded-sm ${isForeground ? 'bg-foreground' : 'bg-muted-foreground/20'}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
