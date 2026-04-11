import { motion } from "motion/react";
import { Music, Zap, Layers, Mic2, Tv, Film, CheckCircle2 } from "lucide-react";

export default function Skills() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">Core Strengths</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            단순한 편집을 넘어, 장르의 본질을 꿰뚫는 연출로<br />
            차별화된 결과물을 만듭니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Music,
              title: "무대와 영상의 완벽한 조화",
              points: ["공연의 흐름과 아티스트의 호흡을 고려한 정밀 연출", "무대 LED 비주얼과 현장감의 극대화", "시청자의 감정선을 놓치지 않는 컷 전환"]
            },
            {
              icon: Zap,
              title: "한계 없는 장르 스펙트럼",
              points: ["음악: 몰입도 높은 대형 쇼 및 시상식 연출", "예능: 템포와 리듬감을 살린 리얼리티 제작", "교양/서바이벌: 메시지와 긴장감을 담은 포맷 구성"]
            },
            {
              icon: Layers,
              title: "프로젝트 토탈 디렉팅",
              points: ["초기 포맷 기획부터 최종 종편까지 전 과정 컨트롤", "스토리텔링 기반의 탄탄한 구성 및 연출", "시청률과 화제성을 고려한 전략적 콘텐츠 설계"]
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
              { icon: Mic2, title: "콘서트 / 시상식", desc: "대형 라이브 현장 연출" },
              { icon: Tv, title: "음악 프로그램", desc: "아티스트 맞춤형 무대·VCR 연출" },
              { icon: Zap, title: "예능 콘텐츠", desc: "장르 불문 리듬감 있는 편집·제작" },
              { icon: Film, title: "숏폼 & 뉴미디어", desc: "화제성 중심의 디지털 콘텐츠 제작" }
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
