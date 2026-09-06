import { motion } from 'framer-motion'
import { testimonials } from '../data/site'

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 leading-tight">
            Dipercaya Pelaku Usaha Parfum di Indonesia
          </h2>
          <p className="mt-3 text-neutral-400 text-sm">
            Pengalaman nyata dari pemilik toko bibit parfum, peracik artisan, hingga fasilitas maklon wewangian.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t: { name: string; role: string; quote: string }, i: number) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#161616] border border-white/[0.06]"
            >
              <div className="flex gap-0.5 mb-4" aria-label="5 dari 5 bintang">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className="text-[#D4AF37] text-sm leading-none" aria-hidden>★</span>
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-neutral-300">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                  {t.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-200 leading-none">{t.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
