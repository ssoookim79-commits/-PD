import ContactForm from "../components/ContactForm";
import { motion } from "motion/react";

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
      </div>
    </div>
  );
}
