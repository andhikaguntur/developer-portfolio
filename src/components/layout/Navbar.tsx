'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { 
    Sun, 
    Moon, 
    Menu, 
    X, 
    Home, 
    User, 
    Trophy, 
    Briefcase, 
    Mail,
    Github,
    Twitter,
    Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
];

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-all duration-300 flex items-center justify-center"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-500" />
            ) : (
                <Moon size={18} className="text-slate-700" />
            )}
        </button>
    );
};

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Desktop Navbar */}
            <header className="hidden lg:flex fixed top-0 w-full h-20 border-b border-border bg-background/50 backdrop-blur-md z-50 px-8 items-center justify-between">
                {/* Brand / Logo */}
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold font-heading tracking-tighter hover:opacity-80 transition-opacity">
                        ANTIGRAVITY<span className="text-primary">.</span>
                    </Link>
                </div>

                {/* Main Navigation */}
                <nav className="flex items-center gap-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 group relative',
                                isActive(item.href)
                                    ? 'text-primary font-semibold'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            {isActive(item.href) && (
                                <motion.div
                                    layoutId="navbar-active"
                                    className="absolute inset-0 bg-primary/10 rounded-full"
                                />
                            )}
                            <item.icon size={16} className={cn(
                                "transition-transform duration-300 group-hover:scale-110 relative z-10",
                                isActive(item.href) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            <span className="text-sm relative z-10">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right Side / Theme Toggle */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </header>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold font-heading tracking-tighter">
                    ANTIGRAVITY<span className="text-primary">.</span>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 rounded-lg bg-muted/50"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-80 bg-background border-r border-border z-[70] p-8 lg:hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-xl font-bold font-heading tracking-tighter">NAV</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Removed profile photo from mobile sidebar as per request "foto profil nya bisa dihilangkan saja" */}
                            
                            <nav className="flex flex-col gap-2 mt-4">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'flex items-center gap-4 p-4 rounded-2xl transition-all',
                                            isActive(item.href) 
                                                ? 'bg-primary/10 text-primary font-bold' 
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        )}
                                    >
                                        <item.icon size={20} />
                                        <span className="text-lg">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto space-y-6">
                                <div className="flex justify-center gap-4">
                                    {SOCIALS.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                                    © 2026 Portfolio
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
