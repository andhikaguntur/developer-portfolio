'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '@/app/actions/chat';

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: "Halo! Aku Mochika, asisten AI Andhika. Ada yang bisa aku bantu seputar portofolio ini?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const robotRef = useRef<HTMLButtonElement>(null);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [isJumping, setIsJumping] = useState(false);
    const [idleType, setIdleType] = useState<'none' | 'shiver' | 'spin' | 'jump' | 'dance'>('none');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const types: ('shiver' | 'spin' | 'jump' | 'dance')[] = ['shiver', 'spin', 'jump', 'dance'];
        
        const idleInterval = setInterval(() => {
            if (!isOpen && !isJumping) {
                const randomType = types[Math.floor(Math.random() * types.length)];
                setIdleType(randomType);
                
                setTimeout(() => {
                    setIdleType('none');
                }, 1500);
            }
        }, 10000);

        return () => clearInterval(idleInterval);
    }, [isOpen, isJumping]);

    const scrollToBottom = useRef(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }).current;

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!robotRef.current) return;
            const rect = robotRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const angle = Math.atan2(deltaY, deltaX);
            const dist = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 800);
            const ratio = dist / 800;
            const easedRatio = 1 - Math.pow(1 - ratio, 3);
            setEyePosition({ 
                x: Math.cos(angle) * 12 * easedRatio, 
                y: Math.sin(angle) * 12 * easedRatio 
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];

        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendChatMessage(newMessages);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBotClick = () => {
        if (!isOpen && !isJumping) {
            setIsJumping(true);
            setTimeout(() => {
                setIsOpen(true);
                setIsJumping(false);
            }, 1200);
        } else if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[320px] md:w-[380px] bg-background border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col"
                    >
                        {/* Chat Header */}
                        <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary relative">
                                    <Bot size={20} />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold font-heading flex items-center gap-1">
                                        Andhika AI <Sparkles size={14} className="text-primary" />
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Online Assistant</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-[380px] overflow-y-auto p-4 flex flex-col gap-4 bg-muted/5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-2 mt-auto mb-1">
                                            <Bot size={12} />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-background border border-border/50 text-foreground rounded-bl-sm'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-2 mt-auto mb-1">
                                        <Bot size={12} />
                                    </div>
                                    <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm bg-background border border-border/50 text-foreground rounded-bl-sm flex items-center gap-2">
                                        <Loader2 size={14} className="animate-spin text-primary" />
                                        <span className="text-muted-foreground text-xs">Mochika sedang mengetik...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSend} className="p-3 bg-background border-t border-border flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask AI anything..."
                                className="flex-1 bg-muted/20 border border-border/50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button type="submit" disabled={!input.trim() || isLoading} className="w-10 h-10 bg-foreground text-background disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors shrink-0">
                                <Send size={16} className="ml-1" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Mochi Robot Button */}
            <motion.button
                ref={robotRef}
                whileHover={{ scale: 1.05 }}
                whileTap={!isJumping ? { scale: 0.95 } : undefined}
                onClick={handleBotClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group w-16 h-16 outline-none"
                style={{ perspective: "400px" }}
            >
                {/* Speech Bubble */}
                <AnimatePresence>
                    {!isOpen && isHovered && !isJumping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background border border-border shadow-xl text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap z-50 pointer-events-none"
                        >
                            Click me! ✨
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-foreground rotate-45 border-b border-r border-border" />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Floating Shadow - moves opposite to the bounce */}
                <motion.div
                    animate={
                        isJumping
                            ? {
                                scale: [1, 1.2, 0.2, 0.2, 1.3, 1],
                                opacity: [0.3, 0.4, 0.05, 0.05, 0.4, 0.3]
                            }
                            : { scale: isOpen ? 1 : [1, 0.8, 1], opacity: isOpen ? 0.2 : [0.3, 0.1, 0.3] }
                    }
                    transition={
                        isJumping
                            ? { duration: 1.2, times: [0, 0.15, 0.4, 0.7, 0.9, 1], ease: ["easeOut", "easeOut", "easeInOut", "easeIn", "easeOut"] }
                            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black rounded-full blur-[4px]"
                />

                {/* Bobbing Wrapper */}
                <motion.div
                    animate={
                        isJumping
                            ? {
                                y: [0, 15, -160, -160, 15, 0],
                                scaleX: [1, 1.3, 0.8, 1, 1.4, 1],
                                scaleY: [1, 0.7, 1.3, 1, 0.6, 1],
                                rotate: [0, 0, 180, 540, 720, 720],
                            }
                            : idleType === 'shiver'
                                ? { x: [0, -2, 2, -2, 2, 0], rotate: [0, -1, 1, -1, 1, 0] }
                                : idleType === 'spin'
                                    ? { rotateY: [0, 360], y: [0, -10, 0] }
                                    : idleType === 'jump'
                                        ? { y: [0, -20, 0], scaleY: [1, 1.2, 0.8, 1] }
                                        : idleType === 'dance'
                                            ? { rotate: [0, -10, 10, -10, 10, 0], x: [0, -5, 5, -5, 5, 0] }
                                            : { y: isOpen ? 0 : [0, -6, 0] }
                    }
                    transition={
                        isJumping
                            ? { duration: 1.2, times: [0, 0.15, 0.4, 0.7, 0.9, 1], ease: ["easeOut", "easeOut", "easeInOut", "easeIn", "easeOut"] }
                            : idleType !== 'none'
                                ? { duration: idleType === 'spin' ? 0.8 : 0.6, repeat: 0, ease: "easeInOut" }
                                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="w-full h-full relative"
                >
                    {/* Antenna */}
                    {!isOpen && (
                        <motion.div
                            className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-zinc-400 rounded-t-full origin-bottom z-0"
                            animate={
                                isJumping
                                    ? { rotate: [0, -45, 45, -45, 45, -45, 45, -45, 45, 0] }
                                    : idleType !== 'none'
                                        ? { rotate: [0, 20, -20, 20, -20, 0] }
                                        : isHovered
                                            ? { rotate: [0, -15, 15, -10, 10, 0] }
                                            : { rotate: eyePosition.x * 3 }
                            }
                            transition={
                                isJumping || idleType !== 'none'
                                    ? { duration: 0.8, ease: "linear" }
                                    : isHovered
                                        ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                                        : { type: "spring", stiffness: 300, damping: 20 }
                            }
                        >
                            <div className="absolute -top-1.5 -left-[4px] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        </motion.div>
                    )}

                    {/* Head Body */}
                    <motion.div
                        animate={{
                            rotateX: isOpen ? 0 : eyePosition.y * -2.5,
                            rotateY: isOpen ? 0 : eyePosition.x * 2.5,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`w-full h-full rounded-2xl flex items-center justify-center relative z-10 overflow-hidden ${isOpen ? 'bg-foreground border border-border shadow-xl' : 'bg-gradient-to-b from-white via-zinc-100 to-zinc-300 border border-white/60 shadow-[0_10px_20px_rgba(0,0,0,0.2),inset_0_-8px_16px_rgba(0,0,0,0.1),inset_0_8px_16px_rgba(255,255,255,0.9)]'}`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {isOpen ? (
                            <X size={28} className="text-background" />
                        ) : (
                            /* Face / Visor */
                            <motion.div
                                className="w-[44px] h-[26px] bg-zinc-900 rounded-[12px] flex items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden"
                                animate={{
                                    x: eyePosition.x * 0.8,
                                    y: eyePosition.y * 0.8,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {/* Visor Glass Reflection */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-gradient-to-b from-white/20 to-transparent rounded-b-full blur-[1px]" />

                                {/* Cheeks */}
                                <motion.div
                                    className="absolute top-[18px] left-[6px] w-[8px] h-[4px] bg-pink-500 rounded-full blur-[1px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered || isJumping ? 0.8 : 0 }}
                                />
                                <motion.div
                                    className="absolute top-[18px] right-[6px] w-[8px] h-[4px] bg-pink-500 rounded-full blur-[1px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered || isJumping ? 0.8 : 0 }}
                                />
                                {/* Eyes Container */}
                                <div className="flex gap-2.5 relative z-10">
                                    <MochikaEye side="left" idleType={idleType} isJumping={isJumping} />
                                    <MochikaEye side="right" idleType={idleType} isJumping={isJumping} />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Notification dot */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
                        </span>
                    )}
                </motion.div>
            </motion.button>
        </div>
    );
}

function MochikaEye({ side, idleType, isJumping }: { 
    side: 'left' | 'right', 
    idleType: string, 
    isJumping: boolean 
}) {
    const isHappy = idleType === 'jump' || isJumping;
    const isExcited = idleType === 'spin';
    
    // Rotations for ^ ^
    const rot1 = isHappy ? -45 : (isExcited ? (side === 'left' ? 45 : -45) : 0);
    const rot2 = isHappy ? 45 : (isExcited ? (side === 'left' ? -45 : 45) : 0);
    
    // Positions
    const x1 = isHappy ? -3 : 0;
    const x2 = isHappy ? 3 : 0;
    const y2 = isExcited ? 6 : -2;

    return (
        <div className="relative w-2.5 h-3.5 flex items-center justify-center">
            <motion.div
                className="bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] rounded-full absolute"
                animate={
                    isHappy || isExcited
                        ? { height: 2, width: 10, rotate: rot1, y: -2, x: x1 }
                        : idleType === 'shiver' || idleType === 'dance'
                            ? { height: 2, width: 10, rotate: 0, y: 0, x: 0 }
                            : { height: 10, width: 6, rotate: 0, y: 0, x: 0 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
            {(isHappy || isExcited) && (
                <motion.div
                    className="bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] rounded-full absolute"
                    animate={{ height: 2, width: 10, rotate: rot2, y: isHappy ? -2 : y2, x: isHappy ? x2 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
            )}
        </div>
    );
}

