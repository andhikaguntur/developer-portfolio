'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { markAsDone } = useLoading();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 800); // Slightly longer pause at 100%
                    return 100;
                }
                // Slower increment for ~3 seconds feel
                const increment = Math.floor(Math.random() * 3) + 2;
                return Math.min(prev + increment, 100);
            });
        }, 80); // Adjusted interval

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence onExitComplete={markAsDone}>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background Subtle Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                    <div className="relative flex flex-col items-center">
                        {/* Animated Brand Name */}
                        <div className="overflow-hidden mb-4">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="text-4xl md:text-6xl font-black font-heading tracking-tighter"
                            >
                                PORTFOLIO<span className="text-primary">.</span>
                            </motion.h1>
                        </div>

                        {/* Progress Container */}
                        <div className="w-64 h-[2px] bg-muted relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        {/* Progress Number */}
                        <div className="mt-4 flex items-baseline gap-1">
                            <motion.span
                                className="text-5xl md:text-7xl font-black font-mono tabular-nums tracking-tighter"
                            >
                                {Math.min(progress, 100)}
                            </motion.span>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">%</span>
                        </div>
                    </div>

                    {/* Footer / Status */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                                System Initializing
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
