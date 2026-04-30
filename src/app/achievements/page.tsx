'use client';

import { motion } from 'framer-motion';
import Achievements from '@/components/home/Achievements';

export default function AchievementsPage() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        All <span className="text-muted-foreground italic">Milestones</span>
                    </h1>
                </motion.div>

                <Achievements />
            </div>
        </div>
    );
}
