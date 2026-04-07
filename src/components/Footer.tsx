export default function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-100 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-light text-brand-primary">/</div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-brand-dark">Sookyung Kim</span>
            <span className="text-xs text-zinc-500">김수경 PD</span>
          </div>
        </div>
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-4 md:mt-0">
          © 2026 All rights reserved.
        </p>
        <div className="flex items-center gap-8 text-zinc-500 text-sm font-bold">
          <a href="#" className="hover:text-brand-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-primary transition-colors">YouTube</a>
          <a href="#" className="hover:text-brand-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
