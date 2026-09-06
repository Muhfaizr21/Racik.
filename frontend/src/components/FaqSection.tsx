import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/site'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#121212]/95 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Pertanyaan yang Sering Diajukan
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-100">
            Semua yang Perlu Anda Ketahui
          </h2>
          <p className="mt-4 text-neutral-400 text-base md:text-lg">
            Jawaban transparan seputar keamanan formula, regulasi parfum, dan integrasi teknis.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37]/40 bg-[#1A1815]'
                    : 'border-white/5 bg-[#161616] hover:border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-neutral-100">
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#D4AF37] text-neutral-950 rotate-45'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-neutral-400 leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-sm text-neutral-400">
            Punya pertanyaan teknis spesifik untuk lab formulasi atau maklon Anda?{' '}
            <a href="#contact" className="text-[#D4AF37] hover:underline font-semibold">
              Hubungi Konsultan Kami →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
