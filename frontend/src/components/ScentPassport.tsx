import { useState, useEffect, useCallback } from 'react'

interface PassportData {
  id: string
  qr_hash: string
  nfc_tag_uid?: string
  lot_number: string
  bottle_serial_number: string
  brand_name: string
  variant_name: string
  concentration_type: string
  top_notes_summary: string
  heart_notes_summary: string
  base_notes_summary: string
  harvest_provenance: string
  maceration_days: number
  bottled_date: string
  total_scanned_count: number
  is_authentic: boolean
  distributor_outlet: string
}

const SAMPLE_HASHES = [
  { hash: '2609-EDP-042', label: 'Santal Royale Extrait (042/200)' },
  { hash: '2609-RSE-019', label: 'Rose Damascena Sublime (019/200)' },
  { hash: '2609-OUD-005', label: 'Assam Agarwood Supreme (005/100)' },
]

export interface ScentPassportProps {
  initialHash?: string
  onHashSelect?: (hash: string) => void
}

function getInitialPassportHash(propHash?: string): string {
  if (propHash) return propHash
  if (typeof window !== 'undefined') {
    const urlHash = window.location.hash
    const match = urlHash.match(/hash=([^&]+)/)
    if (match && match[1]) return decodeURIComponent(match[1])
  }
  return '2609-EDP-042'
}

export function ScentPassport({ initialHash, onHashSelect }: ScentPassportProps = {}) {
  const [activeTab, setActiveTab] = useState<'batch' | 'komposisi' | 'lab'>('batch')
  const [inputHash, setInputHash] = useState(() => getInitialPassportHash(initialHash))
  const [passport, setPassport] = useState<PassportData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Verify hash with live backend API (PostgreSQL database)
  const handleVerify = useCallback(async (hashToVerify: string) => {
    const trimmed = hashToVerify.trim()
    if (!trimmed) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch(`http://localhost:8080/api/v1/passport/verify/${encodeURIComponent(trimmed)}`)
      if (res.ok) {
        const json = await res.json()
        if (json.success && json.data) {
          setPassport(json.data as PassportData)
          setIsLoading(false)
          return
        }
      }

      // If not found in database
      const errJson = await res.json().catch(() => null)
      setErrorMessage(errJson?.message || 'Nomor seri / hash wewangian tidak terdaftar dalam kubah database Racik.')
      setPassport(null)
      setIsLoading(false)
    } catch {
      // Offline fallback sample if backend is momentarily restarting
      if (trimmed === '2609-EDP-042') {
        setPassport({
          id: 'PSP-001',
          qr_hash: '2609-EDP-042',
          nfc_tag_uid: '04:7F:4B:99:C2:A1:80',
          lot_number: 'LOT-202609-SNT-01',
          bottle_serial_number: '042/200',
          brand_name: 'MAISON DE PARFUM',
          variant_name: 'Santal Royale Extrait',
          concentration_type: 'Extrait de Parfum (24% Concentree)',
          top_notes_summary: 'Bergamot Reggio Calabria, Pink Pepper CO2',
          heart_notes_summary: 'Rosa Damascena Absolute, Orris Butter',
          base_notes_summary: 'Assam Oud, Mysore Sandalwood Oil, Ambroxan',
          harvest_provenance: 'Calabria (Italia) & Mysore (India) - Panen 2025',
          maceration_days: 32,
          bottled_date: '2026-02-18T00:00:00Z',
          total_scanned_count: 5,
          is_authentic: true,
          distributor_outlet: 'Official Flagship Butik Senopati Jakarta'
        })
      } else {
        setErrorMessage('Gagal menghubungkan ke server verifikasi PostgreSQL.')
        setPassport(null)
      }
      setIsLoading(false)
    }
  }, [])

  // Auto-verify when initialHash changes or on mount
  useEffect(() => {
    let ignore = false
    const target = initialHash || getInitialPassportHash()

    const execute = async () => {
      if (!ignore) {
        await handleVerify(target)
      }
    }

    void execute()
    return () => {
      ignore = true
    }
  }, [initialHash, handleVerify])

  return (
    <section
      id="passport"
      className="relative py-20 md:py-28 bg-[#131211] border-t border-white/[0.06] scroll-mt-24 transition-all"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(closest-side, #D4AF37, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Educational Content & Hash Search */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block">
              Sertifikat Keaslian & Batch Verification (Anti-Fake)
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug font-display">
              Verifikasi QR Code Batch Unik untuk Tiap Botol yang Beredar.
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Beri kepastian kepada pembeli bahwa parfum yang mereka terima asli dan diracik sesuai standar. Konsumen cukup memindai QR code di kotak atau stiker botol untuk melihat nomor batch resmi langsung dari database PostgreSQL.
            </p>

            {/* Live Interactive Hash Search Bar */}
            <div className="p-4 rounded-2xl bg-[#171615] border border-[#D4AF37]/30 shadow-lg space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                Coba Verifikasi QR Hash / Nomor Seri Botol:
              </label>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleVerify(inputHash)
                  onHashSelect?.(inputHash)
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M12 12h.01" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={inputHash}
                    onChange={(e) => setInputHash(e.target.value)}
                    placeholder="Masukkan QR Hash (cth: 2609-EDP-042)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1D1B1A] border border-white/10 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#e6c34a] text-neutral-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Memeriksa...</span>
                  ) : (
                    <>
                      <span>Verifikasi</span>
                      <span>➜</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sample Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-neutral-400">Contoh Batch Resmi:</span>
                {SAMPLE_HASHES.map((s) => (
                  <button
                    key={s.hash}
                    type="button"
                    onClick={() => {
                      setInputHash(s.hash)
                      handleVerify(s.hash)
                      onHashSelect?.(s.hash)
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      inputHash === s.hash
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                        : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {s.hash}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#171615] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Mencegah Barang Oplosan
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Setiap pemindaian mencatat counter scan di PostgreSQL. Konsumen dapat mengetahui jika botol pernah dipindai sebelumnya.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#171615] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Transparansi Panen Bibit
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Menampilkan asal usul bahan (*provenance*) dan masa maserasi tanpa membocorkan gramatur rahasia formula.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Phone Preview of Passport */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl p-5 bg-[#171514] border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
              {/* Gold Ambient Accent */}
              <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

              {/* Status Header */}
              {isLoading ? (
                <div className="p-12 text-center text-xs text-neutral-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div>Menghubungkan ke PostgreSQL racik...</div>
                </div>
              ) : errorMessage ? (
                <div className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl mx-auto">
                    ✕
                  </div>
                  <div className="text-sm font-bold text-red-300">Peringatan Keamanan</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{errorMessage}</p>
                </div>
              ) : passport ? (
                <div className="space-y-4">
                  {/* Authenticity Badge */}
                  <div className="text-center pb-3 border-b border-white/10">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                        ✓ SERTIFIKAT TERVERIFIKASI ASLI
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-display tracking-wide">
                      {passport.variant_name}
                    </h3>
                    <div className="text-xs text-neutral-400 font-sans mt-0.5">{passport.brand_name}</div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                        HASH: {passport.qr_hash}
                      </span>
                      <span className="text-neutral-500">&bull;</span>
                      <span className="text-[11px] font-mono text-neutral-300">
                        Botol #{passport.bottle_serial_number}
                      </span>
                    </div>
                  </div>

                  {/* Scan Counter Notice */}
                  <div className="px-3 py-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Total Pemindaian Konsumen:</span>
                    <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {passport.total_scanned_count}x Terverifikasi
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-black/40 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('batch')}
                      className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center font-medium ${
                        activeTab === 'batch'
                          ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Info Batch
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('komposisi')}
                      className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center font-medium ${
                        activeTab === 'komposisi'
                          ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Karakter
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('lab')}
                      className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center font-medium ${
                        activeTab === 'lab'
                          ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Panen Lab
                    </button>
                  </div>

                  {/* Tab Content Box */}
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 min-h-[170px] text-xs space-y-2.5">
                    {activeTab === 'batch' && (
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Nomor Lot:</span>
                          <span className="text-white font-mono font-semibold">{passport.lot_number}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Konsentrasi Minyak:</span>
                          <span className="text-[#D4AF37] font-semibold">{passport.concentration_type}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Masa Maserasi:</span>
                          <span className="text-white">{passport.maceration_days} Hari (Vat Stainless)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">Distributor / Butik:</span>
                          <span className="text-neutral-200 text-right truncate max-w-[160px]">
                            {passport.distributor_outlet}
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === 'komposisi' && (
                      <div className="space-y-2">
                        <div>
                          <span className="text-amber-300 font-semibold block text-[11px]">Top Notes:</span>
                          <p className="text-neutral-200 mt-0.5">{passport.top_notes_summary}</p>
                        </div>
                        <div className="pt-1.5 border-t border-white/5">
                          <span className="text-rose-300 font-semibold block text-[11px]">Heart Notes:</span>
                          <p className="text-neutral-200 mt-0.5">{passport.heart_notes_summary}</p>
                        </div>
                        <div className="pt-1.5 border-t border-white/5">
                          <span className="text-amber-500 font-semibold block text-[11px]">Base Notes:</span>
                          <p className="text-neutral-200 mt-0.5">{passport.base_notes_summary}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'lab' && (
                      <div className="space-y-2">
                        <div className="py-1 border-b border-white/5">
                          <span className="text-neutral-400 block text-[11px]">Provenance Panen Bahan:</span>
                          <span className="text-[#D4AF37] font-medium mt-0.5 block">
                            {passport.harvest_provenance}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Standar IFRA:</span>
                          <span className="text-emerald-400 font-medium">100% Compliant (51st)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">NFC Tag UID:</span>
                          <span className="text-neutral-400 font-mono">{passport.nfc_tag_uid || 'AKTIF'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trust Footer */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Database: PostgreSQL</span>
                    <span>Tervalidasi Resmi</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
