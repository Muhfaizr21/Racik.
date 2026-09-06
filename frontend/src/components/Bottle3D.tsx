import { useRef, useState } from 'react'

export function Bottle3D() {
  const ref = useRef<HTMLDivElement>(null)
  const [r, setR] = useState({ x: 0, y: 0 })
  const [g, setG] = useState({ x: 50, y: 35, o: 0 })

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return
    const b = ref.current.getBoundingClientRect()
    const x = e.clientX - b.left
    const y = e.clientY - b.top
    setR({
      x: ((y - b.height / 2) / (b.height / 2)) * -12,
      y: ((x - b.width / 2) / (b.width / 2)) * 16,
    })
    setG({ x: (x / b.width) * 100, y: (y / b.height) * 100, o: 1 })
  }

  function onLeave() {
    setR({ x: 0, y: 0 })
    setG({ x: 50, y: 35, o: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-[300px] h-[440px] md:w-[340px] md:h-[480px] flex items-center justify-center select-none cursor-grab"
      style={{ perspective: '1000px' }}
    >
      {/* Warm glow halo */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(114,47,55,0.18) 40%, transparent 70%)',
          transform: `translate(${r.y * -1}px, ${r.x * 0.8}px)`,
        }}
      />

      {/* Ground shadow */}
      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-36 h-8 rounded-full bg-black/50 blur-md pointer-events-none" />

      {/* 3D card */}
      <div
        className="relative will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${r.x}deg) rotateY(${r.y}deg)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* === BOTOL === */}
        <div className="relative" style={{ transform: 'translateZ(10px)' }}>

          {/* TUTUP EMAS — solid, kelihatan jelas */}
          <div className="relative z-10 mx-auto w-16 h-10 rounded-t-lg"
            style={{
              background: 'linear-gradient(to right, #6b5210, #b8941a, #ffe073, #b8941a, #6b5210)',
              boxShadow: '0 3px 8px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.5)',
              border: '1px solid #ffeaa7',
              borderBottom: 'none',
            }}
          >
            {/* Brush lines */}
            <div className="absolute inset-0 rounded-t-lg"
              style={{ background: 'repeating-linear-gradient(90deg, transparent 0 3px, rgba(255,255,255,0.12) 3px 6px)' }}
            />
            {/* Specular highlight */}
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: `linear-gradient(to right, transparent 20%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 55%, transparent 80%)`,
                transform: `translateX(${r.y * 2}px)`,
                transition: 'transform 0.1s',
              }}
            />
          </div>

          {/* Leher botol */}
          <div className="mx-auto w-8 h-5 rounded-b"
            style={{
              background: 'linear-gradient(to right, #5a480e, #c49e22, #ffeaa7, #c49e22, #5a480e)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}
          />

          {/* BADAN BOTOL — solid glass, bukan transparan */}
          <div className="mx-auto w-[180px] md:w-[200px] h-[300px] md:h-[340px] rounded-[18px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(180deg, #2a1016 0%, #40151f 30%, #50131d 50%, #3d1019 70%, #250c12 100%)',
              border: '2.5px solid #b8941a',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(212,175,55,0.12)',
            }}
          >
            {/* Kaca thickness rim */}
            <div className="absolute inset-1.5 rounded-[13px] border border-white/15 pointer-events-none" />

            {/* Cairan parfum — pekat, kelihatan */}
            <div className="absolute bottom-3 left-3 right-3 rounded-b-[13px] overflow-hidden"
              style={{
                height: '65%',
                background: 'linear-gradient(to top, #2d0a11, #6b2035, #8a3048)',
                boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.5), inset 0 -6px 12px rgba(212,175,55,0.25)',
              }}
            >
              {/* Meniscus */}
              <div
                className="absolute top-0 left-0 right-0 h-[10px]"
                style={{
                  background: 'linear-gradient(to right, #c49e22 0%, #ffe073 40%, #c49e22 100%)',
                  opacity: 0.7,
                  transform: `rotate(${r.y * 0.5}deg) translateY(${r.x * 0.15}px)`,
                  transition: 'transform 0.1s',
                }}
              />
              {/* Caustics glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }}
              />
              {/* Dip tube */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px]"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.15))',
                  transform: `translateX(${r.y * 0.4}px)`,
                  transition: 'transform 0.1s',
                }}
              />
            </div>

            {/* Glass bevel highlights — kiri */}
            <div className="absolute left-1.5 top-5 bottom-5 w-[3px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(255,255,255,0.1), transparent)' }}
            />
            <div className="absolute left-4 top-10 bottom-16 w-[1px] pointer-events-none bg-white/25" />
            {/* Kanan */}
            <div className="absolute right-1.5 top-5 bottom-5 w-[2px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent 60%)' }}
            />

            {/* Mouse glare */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px] mix-blend-screen"
              style={{
                transform: 'translateZ(30px)',
                opacity: g.o ? 0.85 : 0,
                transition: 'opacity 0.2s',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 50% 60% at ${g.x}% ${g.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.12) 40%, transparent 65%)`,
                }}
              />
            </div>

            {/* Bottom glass base */}
            <div className="absolute bottom-0 left-0 right-0 h-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            />

            {/* LABEL — solid emas, teks jelas & tepat di tengah */}
            <div
              className="absolute top-1/2 left-1/2 w-[82%] py-4 px-3 rounded-sm flex flex-col items-center justify-center text-center z-20 pointer-events-none"
              style={{
                background: '#0e0507',
                border: '2px solid #D4AF37',
                boxShadow: '0 6px 20px rgba(0,0,0,0.85), inset 0 0 8px rgba(212,175,55,0.2)',
                transform: `translate(-50%, -50%) translateZ(35px) scale(${1 + Math.abs(r.y) * 0.004})`,
              }}
            >
              <span className="text-[#D4AF37] text-[9px] tracking-[0.28em] font-semibold leading-none">
                MAISON DE
              </span>
              <span
                className="text-white text-lg md:text-xl font-extrabold tracking-[0.24em] leading-none my-2"
                style={{ textShadow: '0 0 14px rgba(212,175,55,0.5)' }}
              >
                PARFUM
              </span>
              <div
                className="w-12 h-[1.5px] my-1"
                style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
              />
              <span className="text-neutral-300 text-[8px] tracking-[0.2em] leading-none">
                EXTRAIT DE PARFUM
              </span>
              <span className="text-[#D4AF37]/80 text-[8px] tracking-widest mt-1.5 leading-none">
                100 ML · 3.4 FL.OZ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive hint */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.12em] text-white/25 uppercase pointer-events-none whitespace-nowrap">
        ← Geser untuk melihat 3D →
      </div>
    </div>
  )
}
