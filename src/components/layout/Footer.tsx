export default function Footer() {
    return (
        <footer className="w-full border-t border-border py-12 px-6 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span>© 2026 Andhika Guntur Ramadan</span>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-border" />
                    <span>Information Systems • UPN "Veteran" Yogyakarta</span>
                </div>

                <div className="flex gap-8">
                    <a href="https://github.com/andhikaguntur" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="https://linkedin.com/in/andhika-guntur" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="https://instagram.com/andhikaguntur" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
