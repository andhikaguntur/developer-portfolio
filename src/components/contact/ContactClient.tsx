'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { sendEmail } from '@/app/actions/contact';

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/andhikaguntur', icon: Github },
    { name: 'Instagram', href: 'https://instagram.com/andhika.guntur', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/andhika-guntur', icon: Linkedin },
];

export function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
        >
            <div>
                <h3 className="text-xl font-bold font-heading mb-4">Contact Information</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                    Interested in discussing IT business analysis, requirements engineering, digital solutions, or collaboration? Feel free to reach out.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Email</p>
                        <a href="mailto:andhikaguntur77.ag@gmail.com" className="text-foreground hover:text-primary transition-colors font-medium">andhikaguntur77.ag@gmail.com</a>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Location</p>
                        <p className="text-foreground font-medium">Sleman, D.I. Yogyakarta</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                        <MessageCircle size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">WhatsApp</p>
                        <a href="https://wa.me/6281281108030" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">+62 812 8110 8030</a>
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
    );
}

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const form = e.currentTarget;

        try {
            const formData = new FormData(form);
            const result = await sendEmail(formData);

            if (result && result.success) {
                setError(null);
                setSubmitted(true);
                form.reset();
                setTimeout(() => setSubmitted(false), 6000);
            } else if (result && result.error) {
                setError(result.error);
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error("Form submit error:", err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                            name="name"
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
                            name="email"
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
                        name="subject"
                        required
                        className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Project Inquiry"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-muted/20 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        placeholder="Tell me about your project..."
                    ></textarea>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                    >
                        {error}
                    </motion.div>
                )}

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
    );
}
