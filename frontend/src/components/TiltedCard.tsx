import { useRef } from 'react'

export function TiltedCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const innerRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current
    if (!el) return
    const r = e.currentTarget.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  function onLeave() {
    const el = innerRef.current
    if (el) el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <div ref={innerRef} className="transition-transform duration-150 ease-out will-change-transform" style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}>
        {children}
      </div>
    </div>
  )
}
