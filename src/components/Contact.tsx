import { motion } from "motion/react";
import { Mail, MessageCircle, Send, User, AtSign, Type, MessageSquare } from "lucide-react";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
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

    console.log("EmailJS Attempt:", { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey });

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ 
        type: 'error', 
        message: 'EmailJS 설정(Service ID, Template ID, Public Key)이 Secrets 메뉴에 등록되지 않았습니다.' 
      });
      setLoading(false);
      return;
    }

    try {
      // 명시적 초기화
      emailjs.init(publicKey);
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      
      console.log("EmailJS Success:", result.text);
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
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
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
              <span className="text-brand-primary">다양한 예능 콘텐츠</span>까지 함께합니다.
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-medium">
              장르의 본질을 이해하는 연출로 최상의 결과물을 약속합니다.<br />
              아래 양식을 통해 문의해 주시면 빠르게 답변해 드리겠습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass p-8 rounded-3xl border-zinc-100">
                <h3 className="text-xl font-bold mb-6 text-brand-dark">Direct Contact</h3>
                <div className="space-y-6">
                  <a 
                    href="mailto:ssoookim79@gmail.com" 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Email</p>
                      <p className="text-brand-dark font-medium">메일 보내기</p>
                    </div>
                  </a>
                  <a 
                    href="https://open.kakao.com/o/svIWxlpi" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#FEE500]/10 flex items-center justify-center text-[#3C1E1E] group-hover:bg-[#FEE500] transition-all">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">KakaoTalk</p>
                      <p className="text-brand-dark font-medium">오픈채팅 바로가기</p>
                    </div>
                  </a>
                </div>
                
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
