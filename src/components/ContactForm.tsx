import { motion } from "motion/react";
import { Send, User, AtSign, Type, MessageSquare } from "lucide-react";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ 
        type: 'error', 
        message: 'EmailJS 설정(Service ID, Template ID, Public Key)이 Secrets 메뉴에 등록되지 않았습니다.' 
      });
      setLoading(false);
      return;
    }

    try {
      emailjs.init(publicKey);
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setStatus({ type: 'success', message: '메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.' });
      formRef.current?.reset();
    } catch (error: any) {
      console.error("EmailJS Error Details:", error);
      const errorMsg = error?.text || error?.message || '전송 중 오류가 발생했습니다.';
      setStatus({ type: 'error', message: `전송 실패: ${errorMsg} (EmailJS 설정을 다시 확인해주세요.)` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark flex items-center gap-2">
              <User className="w-4 h-4 text-brand-primary" /> 성함
            </label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="홍길동"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark flex items-center gap-2">
              <AtSign className="w-4 h-4 text-brand-primary" /> 이메일
            </label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="example@email.com"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark flex items-center gap-2">
            <Type className="w-4 h-4 text-brand-primary" /> 제목
          </label>
          <input
            type="text"
            name="subject"
            required
            placeholder="문의 제목을 입력해주세요"
            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-primary" /> 메시지
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="내용을 입력해주세요"
            className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
          />
        </div>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl text-sm font-medium ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}
          >
            {status.message}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              메시지 보내기 <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
