import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScentPassport } from '../components/ScentPassport'

interface PassportPageProps {
  initialHash?: string
  onSelectHash?: (hash: string) => void
  onNavigateHome: () => void
}

export function PassportPage({ initialHash, onSelectHash, onNavigateHome }: PassportPageProps) {
  const [copied, setCopied] = useState(false)
  const currentHash = initialHash || '2609-EDP-042'

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#/passport?hash=${encodeURIComponent(currentHash)}`
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <div className="pt-24 pb-20 bg-[#131211] min-h-screen text-neutral-100">
      {/* Breadcrumb & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Beranda</span>
            </button>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">Digital Scent Passport</span>
            <span>/</span>
            <span className="text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
              Batch: {currentHash}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#1C1A18] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs text-[#D4AF37] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Salin tautan verifikasi batch ini"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? 'Tautan Disalin! ✓' : 'Bagikan Link Sertifikat'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Route Notification Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#1A1816] via-[#1D1B19] to-[#1A1816] border border-[#D4AF37]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 font-mono text-sm font-bold">
              ✓
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Dedicated Route: Anti-Fake Scent Passport Live Verifier
              </h2>
              <p className="text-xs text-neutral-400">
                Data ditarik secara dinamis dari database PostgreSQL server <code className="text-[#D4AF37]">racik</code>. Setiap hash memiliki riwayat batch terenkripsi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DB: racik (PostgreSQL) Connected
            </span>
          </div>
        </div>
      </div>

      {/* Copy notification toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1E1C1A] border border-[#D4AF37] text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>URL Sertifikat disalin ke clipboard: {window.location.href}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main ScentPassport Engine Component */}
      <ScentPassport
        initialHash={initialHash}
        onHashSelect={onSelectHash}
      />

      {/* Technical Laboratory Transparency & Security Features */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-2">
            Standarisasi Industri Wewangian
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Mengapa Digital Scent Passport Penting Bagi Brand Niche?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Industri parfum rentan terhadap botol oplosan dan klaim konsentrasi fiktif. Racik memberikan perlindungan kriptografis pada setiap lot batch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#171615] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Enkripsi QR & Counter Scan
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Setiap kali konsumen memindai botol di gerai atau di rumah, counter scan bertambah di server. Jika nomor seri yang sama dipindai ratusan kali di kota berbeda, sistem membunyikan alert indikasi pemalsuan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171615] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              2. Transparansi Masa Maserasi
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Konsumen dapat melihat berapa hari formula dimatangkan dalam tangki stainless steel berpendingin sebelum dibotolkan, menjamin kestabilan aroma dan kemewahan dry-down.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171615] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              3. Kepatuhan IFRA 51st Amendment
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sistem memverifikasi bahwa rasio alergen seperti Eugenol, Iso E Super, dan Lilial tetap di bawah ambang batas yang disyaratkan BPOM RI dan asosiasi wewangian internasional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
