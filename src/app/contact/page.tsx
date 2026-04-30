'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/andhikaguntur', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <div className="w-full py-12 md:py-20">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16">
                        Let's <span className="text-muted-foreground italic">Connect</span>
                    </h1>
                </motion.div>

                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-2 space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold font-heading mb-4">Contact Information</h3>
                            <p className="text-muted-foreground font-light leading-relaxed mb-8">
                                Looking to start a new project or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Email</p>
                                    <a href="mailto:hello@andhikaguntur.dev" className="text-foreground hover:text-primary transition-colors font-medium">hello@andhikaguntur.dev</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Location</p>
                                    <p className="text-foreground font-medium">Earth, Internet</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Profiles */}
                        <div className="pt-8 border-t border-border/50">
                            <h4 className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-4">Social Profiles</h4>
                            <div className="flex items-center gap-4">
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-muted/30 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-1 shadow-sm"
                                        aria-label={social.name}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:col-span-3 bg-background border border-border/50 rounded-3xl p-8 shadow-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required
                                        className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required
                                        className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    required
                                    className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={5}
                                    required
                                    className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting || submitted}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-md
                                    ${submitted ? 'bg-green-500 text-white' : 'bg-foreground text-background hover:bg-foreground/90'}
                                `}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <MessageSquare className="animate-pulse" size={18} /> Sending...
                                    </span>
                                ) : submitted ? (
                                    <span className="flex items-center gap-2">
                                        Sent Successfully!
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send size={18} /> Send Message
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
