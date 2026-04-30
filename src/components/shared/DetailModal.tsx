'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    year?: string;
    organization?: string;
    stack?: string[];
    github?: string;
    live?: string;
    icon?: React.ReactNode;
    image?: string;
}

export default function DetailModal({
    isOpen,
    onClose,
    title,
    description,
    year,
    organization,
    stack,
    github,
    live,
    icon,
    image
}: DetailModalProps) {
    
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-background border border-border shadow-2xl rounded-3xl overflow-hidden z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                            <div className="flex flex-col gap-8">
                                {/* Media / Image */}
                                {image && (
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted relative">
                                        <img 
                                            src={image} 
                                            alt={title} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                                    </div>
                                )}

                                {/* Header */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        {icon && (
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                {icon}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-2xl md:text-3xl font-black tracking-tighter">
                                                    {title}
                                                </h2>
                                                {year && (
                                                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground ml-4">
                                                        {year}
                                                    </span>
                                                )}
                                            </div>
                                            {organization && (
                                                <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">
                                                    {organization}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="space-y-6">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                    </div>

                                    {stack && (
                                        <div className="flex flex-wrap gap-2">
                                            {stack.map((tech) => (
                                                <span key={tech} className="px-3 py-1.5 bg-muted/50 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="pt-8 border-t border-border flex flex-wrap gap-4">
                                    {github && (
                                        <a
                                            href={github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                                        >
                                            <Github size={18} />
                                            Source Code
                                        </a>
                                    )}
                                    {live && (
                                        <a
                                            href={live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted font-bold text-xs uppercase tracking-widest transition-all"
                                        >
                                            <ExternalLink size={18} />
                                            Live Demo
                                        </a>
                                    )}
                                    {!github && !live && (
                                        <p className="text-xs text-muted-foreground italic">
                                            No external links available for this entry.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
