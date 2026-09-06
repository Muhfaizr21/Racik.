import { useState, useEffect } from 'react'

interface SpotLight {
  x: number
  y: number
  id: number
}

export function SpotLightBg() {
  const [lights, setLights] = useState<SpotLight[]>([
    { x: 25, y: 35, id: 0 },
    { x: 75, y: 55, id: 1 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setLights((prev) => {
        const newLight = {
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          id: Date.now(),
        }
        return [prev[1], newLight]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lights.map((light) => (
        <div key={light.id} className="absolute w-[600px] h-[600px] rounded-full">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(212,175,55,0.10) 0%, rgba(114,47,55,0.06) 25%, transparent 60%)`,
              transform: `translate(${light.x - 50}vw, ${light.y - 50}vh)`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
