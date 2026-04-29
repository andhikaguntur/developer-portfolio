export default function Footer() {
    return (
        <footer className="w-full border-t border-border py-12 px-6 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span>© 2026 Developer Portfolio</span>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-border" />
                    <span>Based in Antigravity</span>
                </div>

                <div className="flex gap-8">
                    <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                    <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}

