import { motion } from "motion/react";
import { Music, Zap, Layers, Mic2, Tv, Film, CheckCircle2 } from "lucide-react";

export default function Skills() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">Core Strengths</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            단순한 편집을 넘어, 장르의 본질을 꿰뚫는 연출로<br />
            차별화된 결과물을 만듭니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Music,
              title: "무대를 이해하는 편집",
              points: ["공연 흐름 유지", "감정선 끊지 않음", "현장감 극대화"]
            },
            {
              icon: Zap,
              title: "장르 전환 능력",
              points: ["음악 → 몰입 / 감정 중심", "예능 → 템포 / 재미 중심", "다양한 장르 대응"]
            },
            {
              icon: Layers,
              title: "전체 흐름 설계",
              points: ["단순 편집이 아닌 구조 설계", "스토리텔링 기반 연출", "시청 지속 시간 최적화"]
            }
          ].map((strength, i) => (
            <div key={i} className="glass p-10 rounded-3xl border-brand-light/30 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <strength.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-6 text-brand-dark">{strength.title}</h3>
              <ul className="space-y-3">
                {strength.points.map((point, j) => (
                  <li key={j} className="text-zinc-500 font-medium flex items-center gap-2 justify-center">
                    <span className="text-brand-accent font-bold">·</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Services / Possible Tasks */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-brand-dark mb-10">가능 업무</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Mic2, title: "콘서트 / 시상식", desc: "고품격 현장 편집" },
              { icon: Tv, title: "음악 프로그램", desc: "흐름 중심 제작" },
              { icon: Zap, title: "예능 콘텐츠", desc: "리듬감 있는 편집" },
              { icon: Film, title: "숏폼 콘텐츠", desc: "바이럴 최적화 제작" }
            ].map((service, i) => (
              <div key={i} className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl hover:border-brand-primary/30 transition-all hover:shadow-xl hover:shadow-brand-primary/5 group flex flex-col items-center text-center">
                <service.icon className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold mb-2 text-brand-dark">{service.title}</h4>
                <p className="text-zinc-500 text-sm font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
