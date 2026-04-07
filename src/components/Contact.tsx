import { motion } from "motion/react";
import { Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-dark">
            음악 프로그램은 물론,<br />
            <span className="text-brand-primary">다양한 예능 콘텐츠</span>까지 함께합니다.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-12 font-medium">
            장르의 본질을 이해하는 연출로 최상의 결과물을 약속합니다.<br />
            지금 바로 문의하고 프로젝트를 시작하세요.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:pd@example.com" 
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-brand-dark text-white font-bold rounded-2xl hover:bg-zinc-800 transition-colors shadow-xl shadow-brand-dark/10"
            >
              <Mail className="w-5 h-5" /> 이메일 문의하기
            </a>
            <a 
              href="https://open.kakao.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#FEE500] text-[#3C1E1E] font-bold rounded-2xl hover:bg-[#FADA0A] transition-colors shadow-xl shadow-yellow-500/10"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> 카카오톡 오픈채팅
            </a>
          </div>

          <p className="mt-12 text-zinc-400 text-sm font-medium">
            평균 응답 시간: 2시간 이내 (평일 기준)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
