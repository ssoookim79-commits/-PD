import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      {/* Background Video Placeholder / Gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light/50 via-white to-white z-10" />
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
          alt="Studio Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase border border-brand-primary/30 rounded-full text-brand-primary bg-brand-primary/5">
            Freelance Variety Show PD
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-brand-dark">
            음악과 예능,<br />
            <span className="text-brand-accent italic drop-shadow-sm">모두를 다루는 PD</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl mb-12 font-medium leading-relaxed">
            콘서트, 시상식, 음악 프로그램 경험을 바탕으로<br className="hidden md:block" />
            다양한 예능 콘텐츠를 제작합니다.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20"
        >
          <Link 
            to="/contact" 
            className="btn-primary px-10 py-4 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              작업 문의하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            to="/portfolio" 
            className="px-10 py-4 bg-white hover:bg-zinc-50 text-brand-dark font-bold rounded-xl border border-zinc-200 transition-all shadow-sm"
          >
            포트폴리오 전체 보기
          </Link>
        </motion.div>

        {/* Key Keywords */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-zinc-100 pt-12 mb-24"
        >
          {[
            { title: "음악 프로그램 특화", desc: "시상식, 라이브 무대 등 고퀄리티 음악 연출" },
            { title: "예능 편집 / 연출", desc: "리듬감 있는 컷 편집과 몰입도 높은 연출" },
            { title: "다양한 장르 대응", desc: "교양과 웹예능까지 폭넓은 제작 스펙트럼" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <h3 className="text-brand-primary font-bold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
