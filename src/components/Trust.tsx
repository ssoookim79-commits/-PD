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
                { icon: TrendingUp, label: "최고 시청률", value: "23.1%" },
                { icon: Star, label: "제작 프로그램", value: "50편+" },
                { icon: Award, label: "제작 경력", value: "10년 차 베테랑" }
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
                <li>• 음악 쇼 및 대형 시상식 메인/현장 연출</li>
                <li>• 글로벌 서바이벌 및 리얼리티 예능 기획·제작</li>
                <li>• 국가급 대형 라이브 이벤트 및 생방송 진행</li>
                <li>• 10년 차 올라운더 PD</li>
              </ul>
            </div>
            <div className="glass p-8 rounded-3xl border-brand-light/30 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-6 border-b border-zinc-100 pb-4 text-brand-dark">Message</h3>
                <blockquote className="text-2xl font-bold text-[#C7D2FE] italic leading-tight mb-6">
                  "결과로 증명하는 10년 차 올라운더"
                </blockquote>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-light" />
                <div>
                  <p className="text-sm font-bold text-brand-dark">김수경 PD</p>
                  <p className="text-xs text-zinc-500 font-medium">Broadcasting Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
