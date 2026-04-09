import { motion } from "motion/react";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-zinc-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-dark">
              음악 프로그램은 물론<br />
              <span className="text-brand-primary">다양한 예능 콘텐츠</span>까지 함께합니다
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-medium">
              장르의 본질을 이해하는 연출로 최상의 결과물을 약속합니다<br />
              협업 제안이나 문의사항은 아래 채널을 통해 남겨주세요
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link 
              to="/contact" 
              className="w-full md:w-80 glass p-8 rounded-3xl border-zinc-100 flex items-center gap-6 group hover:border-brand-primary/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">Email</p>
                <p className="text-brand-dark font-bold text-lg">메일 보내기</p>
              </div>
            </Link>

            <a 
              href="https://open.kakao.com/o/svIWxlpi" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-80 glass p-8 rounded-3xl border-zinc-100 flex items-center gap-6 group hover:border-[#FEE500]/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FEE500]/10 flex items-center justify-center text-[#3C1E1E] group-hover:bg-[#FEE500] transition-all">
                <MessageCircle className="w-8 h-8 fill-current" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">KakaoTalk</p>
                <p className="text-brand-dark font-bold text-lg">오픈채팅 바로가기</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
