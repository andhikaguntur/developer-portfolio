'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Reply, Heart, Send, LogOut, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

type CommentType = {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    isLiked?: boolean;
    replies?: CommentType[];
};

const DUMMY_COMMENTS: CommentType[] = [
    {
        id: '1',
        author: 'Sarah Jenkins',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=b6e3f4',
        content: 'This portfolio is incredibly smooth! The animations are top notch. Did you use Framer Motion for everything?',
        timestamp: '2 hours ago',
        likes: 12,
        replies: [
            {
                id: '1-1',
                author: 'Andhika Guntur',
                avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Andhika&backgroundColor=c0aede',
                content: 'Thank you Sarah! Yes, mostly Framer Motion mixed with some pure CSS transitions for performance.',
                timestamp: '1 hour ago',
                likes: 5,
            }
        ]
    },
    {
        id: '2',
        author: 'Alex Chen',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=ffdfbf',
        content: 'Love the minimalist dark mode aesthetic. Super clean code structure too.',
        timestamp: '5 hours ago',
        likes: 8,
    }
];

export default function Comments() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [comments, setComments] = useState<CommentType[]>(DUMMY_COMMENTS);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const currentUser = {
        name: 'Guest User',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Guest&backgroundColor=ffd5dc'
    };

    const handleLogin = () => {
        // Dummy Google Login
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setReplyingTo(null);
    };

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: CommentType = {
            id: Date.now().toString(),
            author: currentUser.name,
            avatar: currentUser.avatar,
            content: newComment,
            timestamp: 'Just now',
            likes: 0,
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    const handlePostReply = (e: React.FormEvent, parentId: string) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setComments(comments.map(c => {
            if (c.id === parentId) {
                const newReply: CommentType = {
                    id: Date.now().toString(),
                    author: currentUser.name,
                    avatar: currentUser.avatar,
                    content: replyText,
                    timestamp: 'Just now',
                    likes: 0,
                };
                return { ...c, replies: [...(c.replies || []), newReply] };
            }
            return c;
        }));
        
        setReplyText('');
        setReplyingTo(null);
    };

    const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
        if (!isLoggedIn) return; // Must be logged in to like (optional dummy rule)

        setComments(comments.map(c => {
            if (!isReply && c.id === commentId) {
                return { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 };
            } else if (isReply && c.id === parentId) {
                return {
                    ...c,
                    replies: c.replies?.map(r => 
                        r.id === commentId ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 } : r
                    )
                };
            }
            return c;
        }));
    };

    const CommentItem = ({ comment, isReply = false, parentId }: { comment: CommentType, isReply?: boolean, parentId?: string }) => (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mt-8'}`}
        >
            <div className="shrink-0">
                <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full bg-muted border border-border" />
            </div>
            <div className="flex-1 space-y-2">
                <div className="bg-muted/30 border border-border/50 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="font-bold text-sm text-foreground">{comment.author}</span>
                            <span className="text-xs text-muted-foreground ml-2">{comment.timestamp}</span>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                        {comment.content}
                    </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground pl-2">
                    <button 
                        onClick={() => toggleLike(comment.id, isReply, parentId)}
                        className={`flex items-center gap-1.5 transition-colors ${comment.isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}
                    >
                        <Heart size={14} className={comment.isLiked ? "fill-pink-500" : ""} />
                        <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                    </button>
                    {!isReply && (
                        <button 
                            onClick={() => isLoggedIn ? setReplyingTo(replyingTo === comment.id ? null : comment.id) : null}
                            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                        >
                            <Reply size={14} />
                            <span>Reply</span>
                        </button>
                    )}
                </div>

                {/* Reply Input */}
                <AnimatePresence>
                    {replyingTo === comment.id && !isReply && (
                        <motion.form 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={(e) => handlePostReply(e, comment.id)}
                            className="mt-4 flex gap-3 overflow-hidden"
                        >
                            <img src={currentUser.avatar} alt="You" className="w-8 h-8 rounded-full bg-muted border border-border shrink-0 mt-1" />
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder={`Replying to ${comment.author}...`}
                                    className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                    autoFocus
                                />
                                <button 
                                    type="submit"
                                    disabled={!replyText.trim()}
                                    className="absolute right-1 top-1 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    <Send size={12} className="-ml-0.5" />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Nested Replies */}
                {comment.replies && comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
                ))}
            </div>
        </motion.div>
    );

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-muted-foreground text-xs uppercase tracking-widest block font-bold mb-3">
                            Section &mdash; 04
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-sm leading-none text-foreground flex items-center gap-3">
                            Community <span className="text-primary italic">Chat</span>
                        </h2>
                    </div>
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                            <LogOut size={14} /> Logout
                        </button>
                    )}
                </div>

                <div className="bg-background border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                    {/* Main Input Area */}
                    <div className="relative">
                        {!isLoggedIn && (
                            <div className="absolute inset-0 z-20 backdrop-blur-sm bg-background/50 rounded-2xl flex flex-col items-center justify-center border border-border/50">
                                <p className="text-sm font-semibold text-foreground mb-4">Join the conversation</p>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogin}
                                    className="flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                                        </g>
                                    </svg>
                                    Continue with Google
                                </motion.button>
                            </div>
                        )}
                        
                        <div className="flex gap-4">
                            <img 
                                src={isLoggedIn ? currentUser.avatar : 'https://api.dicebear.com/7.x/notionists/svg?seed=Unknown&backgroundColor=e2e8f0'} 
                                alt="Avatar" 
                                className="w-12 h-12 rounded-full bg-muted border border-border shrink-0" 
                            />
                            <form onSubmit={handlePostComment} className="flex-1">
                                <div className="relative">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="What are your thoughts?"
                                        className="w-full bg-muted/20 border border-border rounded-2xl p-4 min-h-[100px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                    />
                                    <div className="absolute bottom-3 right-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={!newComment.trim() || !isLoggedIn}
                                            type="submit"
                                            className="bg-primary text-primary-foreground p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                        >
                                            <Send size={18} className="ml-0.5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full h-px bg-border/50 my-8" />

                    {/* Comments List */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <MessageSquare size={16} />
                            <span>{comments.length + comments.reduce((acc, curr) => acc + (curr.replies?.length || 0), 0)} Comments</span>
                        </div>
                        
                        <AnimatePresence>
                            {comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
