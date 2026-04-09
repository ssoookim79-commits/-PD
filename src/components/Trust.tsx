import { motion } from "motion/react";
import { Star, Award, TrendingUp } from "lucide-react";

export default function Trust() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-4xl font-bold leading-tight text-brand-dark">
              결과로 증명하는<br />
              <span className="text-brand-primary">신뢰의 지표</span>
            </h2>
            <div className="space-y-6">
              {[
                { icon: TrendingUp, label: "누적 조회수", value: "5,000만+" },
                { icon: Star, label: "협업 브랜드", value: "30+" },
                { icon: Award, label: "평균 시청 지속 시간", value: "45% 향상" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                    <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brands & Reviews */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl border-brand-light/30">
              <h3 className="text-lg font-bold mb-6 border-b border-zinc-100 pb-4 text-brand-dark">Experience</h3>
              <ul className="space-y-4 text-zinc-600 font-medium">
                <li>• 음악 프로그램 관련 작업 경험</li>
                <li>• 예능 콘텐츠 제작 경험</li>
                <li>• 콘서트 / 시상식 현장 연출 지원</li>
                <li>• 대형 MCN 소속 크리에이터 PD</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-3xl border-brand-light/30 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-6 border-b border-zinc-100 pb-4 text-brand-dark">Message</h3>
                <blockquote className="text-2xl font-bold text-[#C7D2FE] italic leading-tight mb-6">
                  "장르에 맞는 결과를 만듭니다"
                </blockquote>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-light" />
                <div>
                  <p className="text-sm font-bold text-brand-dark">김수경 PD</p>
                  <p className="text-xs text-zinc-500 font-medium">Freelance Variety PD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
