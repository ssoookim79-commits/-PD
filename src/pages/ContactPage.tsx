import ContactForm from "../components/ContactForm";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-dark">Contact</h1>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium">
            프로젝트 문의나 협업 제안 등<br />
            자유롭게 메시지를 남겨주세요
          </p>
        </motion.div>
        
        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto"
        >
          <a 
            href="https://open.kakao.com/o/svIWxlpi" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 glass border-zinc-200 text-brand-dark font-bold rounded-xl transition-all hover:bg-zinc-50 hover:border-[#FEE500]/50 active:scale-95 group"
          >
            <MessageCircle className="w-5 h-5 text-[#FEE500] fill-current" />
            <span>카카오톡 오픈채팅 문의</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
