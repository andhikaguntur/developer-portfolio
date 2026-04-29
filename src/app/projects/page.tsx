'use client';

import { motion } from 'framer-motion';
import Projects from '@/components/home/Projects';

export default function ProjectsPage() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-muted-foreground text-sm uppercase tracking-widest mb-4 block">
                        Archive &mdash; 02
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">
                        Project <span className="text-muted-foreground">Gallery</span>
                    </h1>
                </motion.div>

                <Projects />
            </div>
        </div>
    );
}
