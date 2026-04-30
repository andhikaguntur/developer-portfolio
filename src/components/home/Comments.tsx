'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Reply, Heart, Send, LogOut, MoreHorizontal, Crown } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

type CommentType = {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    isLiked?: boolean;
    parent_id?: string | null;
    replies?: CommentType[];
    created_at?: string;
};

export default function Comments() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [currentUser, setCurrentUser] = useState({
        name: 'Guest User',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Guest&backgroundColor=ffd5dc'
    });

    const fetchComments = useCallback(async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) return console.error('Error fetching comments:', error);

        if (data) {
            const mainComments: CommentType[] = [];
            const allReplies: CommentType[] = [];

            data.forEach(comment => {
                const formatted: CommentType = {
                    id: comment.id,
                    author: comment.author,
                    avatar: comment.avatar,
                    content: comment.content,
                    timestamp: new Date(comment.created_at).toLocaleString(),
                    likes: comment.likes || 0,
                    parent_id: comment.parent_id,
                    replies: []
                };
                comment.parent_id ? allReplies.push(formatted) : mainComments.push(formatted);
            });

            mainComments.forEach(parent => {
                parent.replies = allReplies.filter(reply => reply.parent_id === parent.id);
            });

            setComments(mainComments.reverse());
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsLoggedIn(true);
                setCurrentUser({
                    name: session.user.user_metadata.full_name || 'User',
                    avatar: session.user.user_metadata.avatar_url || session.user.user_metadata.picture || `https://api.dicebear.com/7.x/notionists/svg?seed=${session.user.id}`
                });
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
            if (session) {
                setCurrentUser({
                    name: session.user.user_metadata.full_name || 'User',
                    avatar: session.user.user_metadata.avatar_url || session.user.user_metadata.picture || `https://api.dicebear.com/7.x/notionists/svg?seed=${session.user.id}`
                });
            }
        });

        fetchComments();
        return () => subscription.unsubscribe();
    }, [fetchComments]);

    const handleLogin = () => supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin, queryParams: { prompt: 'select_account' } }
    });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = window.location.pathname;
    };

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !isLoggedIn) return;

        const { error } = await supabase.from('comments').insert([{
            author: currentUser.name,
            avatar: currentUser.avatar,
            content: newComment,
            likes: 0
        }]);

        if (!error) {
            setNewComment('');
            fetchComments();
        }
    };

    const handlePostReply = async (e: React.FormEvent, parentId: string) => {
        e.preventDefault();
        if (!replyText.trim() || !isLoggedIn) return;

        const { error } = await supabase.from('comments').insert([{
            author: currentUser.name,
            avatar: currentUser.avatar,
            content: replyText,
            likes: 0,
            parent_id: parentId
        }]);

        if (!error) {
            setReplyText('');
            setReplyingTo(null);
            fetchComments();
        }
    };

    const toggleLike = useCallback(async (commentId: string, isReply: boolean, parentId?: string) => {
        if (!isLoggedIn) return;

        setComments(prev => prev.map(c => {
            if (!isReply && c.id === commentId) {
                const newIsLiked = !c.isLiked;
                const newLikes = newIsLiked ? c.likes + 1 : Math.max(0, c.likes - 1);
                
                // Fire and forget update
                supabase.from('comments').update({ likes: newLikes }).eq('id', commentId);
                return { ...c, isLiked: newIsLiked, likes: newLikes };
            } else if (isReply && c.id === parentId) {
                return {
                    ...c,
                    replies: c.replies?.map(r => {
                        if (r.id === commentId) {
                            const newIsLiked = !r.isLiked;
                            const newLikes = newIsLiked ? r.likes + 1 : Math.max(0, r.likes - 1);
                            supabase.from('comments').update({ likes: newLikes }).eq('id', commentId);
                            return { ...r, isLiked: newIsLiked, likes: newLikes };
                        }
                        return r;
                    })
                };
            }
            return c;
        }));
    }, [isLoggedIn]);

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter flex items-center gap-3">
                        Community <span className="text-muted-foreground italic">Chat</span>
                    </h2>
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                            <LogOut size={14} /> Logout
                        </button>
                    )}
                </div>

                <div className="bg-background border border-border rounded-3xl p-6 md:p-8 shadow-sm">
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
                                    <GoogleIcon />
                                    Continue with Google
                                </motion.button>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <Avatar src={isLoggedIn ? currentUser.avatar : 'guest'} alt="Avatar" size="lg" />
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
                                            className="bg-primary text-primary-foreground p-2 rounded-full disabled:opacity-50 shadow-md"
                                        >
                                            <Send size={18} className="ml-0.5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full h-px bg-border/50 my-8" />

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <MessageSquare size={16} />
                            <span>{comments.length + comments.reduce((acc, curr) => acc + (curr.replies?.length || 0), 0)} Comments</span>
                        </div>

                        <AnimatePresence>
                            {comments.map((comment) => (
                                <CommentItem 
                                    key={comment.id}
                                    comment={comment} 
                                    isLoggedIn={isLoggedIn}
                                    replyingTo={replyingTo}
                                    setReplyingTo={setReplyingTo}
                                    replyText={replyText}
                                    setReplyText={setReplyText}
                                    handlePostReply={handlePostReply}
                                    toggleLike={toggleLike}
                                    currentUser={currentUser}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

const CommentItem = memo(({ comment, isReply = false, parentId, isLoggedIn, replyingTo, setReplyingTo, replyText, setReplyText, handlePostReply, toggleLike, currentUser }: any) => {
    const isOwner = comment.author.toLowerCase().includes('andhika');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${isReply ? 'ml-12 mt-4' : 'mt-8'}`}
        >
            <div className="shrink-0 relative">
                <Avatar src={comment.avatar} alt={comment.author} isOwner={isOwner} />
                {isOwner && (
                    <div className="absolute -top-2 -right-1 bg-yellow-400 text-black rounded-full p-0.5 shadow-lg border-2 border-background">
                        <Crown size={10} fill="currentColor" />
                    </div>
                )}
            </div>
            <div className="flex-1 space-y-2">
                <div className={`border rounded-2xl rounded-tl-sm p-4 shadow-sm transition-all duration-300 ${isOwner
                    ? 'bg-yellow-500/5 border-yellow-500/20 ring-1 ring-yellow-500/10'
                    : 'bg-muted/30 border-border/50'
                    }`}>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold text-sm ${isOwner ? 'text-yellow-600 dark:text-yellow-500' : 'text-foreground'}`}>
                                {comment.author}
                            </span>
                            {isOwner && <AuthorBadge />}
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <MoreHorizontal size={16} className="text-muted-foreground cursor-pointer" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{comment.content}</p>
                </div>

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

                <AnimatePresence>
                    {replyingTo === comment.id && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={(e) => handlePostReply(e, comment.id)}
                            className="mt-4 flex gap-3 overflow-hidden"
                        >
                            <Avatar src={currentUser.avatar} alt="You" size="sm" />
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder={`Replying to ${comment.author}...`}
                                    className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                    autoFocus
                                />
                                <button type="submit" disabled={!replyText.trim()} className="absolute right-1 top-1 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50">
                                    <Send size={12} className="-ml-0.5" />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {comment.replies?.map((reply: any) => (
                    <CommentItem 
                        key={reply.id}
                        comment={reply} 
                        isReply={true}
                        parentId={comment.id}
                        isLoggedIn={isLoggedIn}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        handlePostReply={handlePostReply}
                        toggleLike={toggleLike}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </motion.div>
    );
});

CommentItem.displayName = 'CommentItem';

// Sub-components for cleaner code
const Avatar = ({ src, alt, size = 'md', isOwner = false }: any) => {
    const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
    const finalSrc = src === 'guest' ? 'https://api.dicebear.com/7.x/notionists/svg?seed=Guest&backgroundColor=ffd5dc' : (src || `https://api.dicebear.com/7.x/notionists/svg?seed=${alt}`);
    
    return (
        <div className={`${dim} rounded-full bg-muted border overflow-hidden relative ${isOwner ? 'border-yellow-500 ring-2 ring-yellow-500/20' : 'border-border'}`}>
            <Image src={finalSrc} alt={alt} fill className="object-cover" unoptimized={finalSrc.includes('dicebear')} />
        </div>
    );
};

const AuthorBadge = () => (
    <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-[9px] font-bold uppercase tracking-wider rounded border border-yellow-500/20 flex items-center gap-1 shadow-sm">
        <Crown size={8} className="fill-yellow-500/20" />
        Author
    </span>
);

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
        </g>
    </svg>
);
