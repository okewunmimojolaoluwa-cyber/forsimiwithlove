'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Generate heart shape points using parametric equation
function generateHeartPoints(count: number) {
  const points = []
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    points.push({ x, y })
  }
  return points
}

const PARTICLE_COUNT = 120
const heartPoints = generateHeartPoints(PARTICLE_COUNT)

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'emerge' | 'hold' | 'disperse' | 'done'>('emerge')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 2000)
    const t2 = setTimeout(() => setPhase('disperse'), 4500)
    const t3 = setTimeout(() => setPhase('done'), 6500)
    const t4 = setTimeout(() => onComplete(), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(157,78,221,0.35) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,110,0.35) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1.4, 1, 1.4], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Heart particles */}
          <div className="relative w-[340px] h-[340px]">
            {heartPoints.map((point, i) => {
              const cx = 170 + point.x * 9
              const cy = 170 + point.y * 9
              const color = i % 2 === 0 ? '#c77dff' : '#ff006e'
              const size = 3 + Math.random() * 3

              // Random disperse direction
              const angle = Math.random() * Math.PI * 2
              const dist = 200 + Math.random() * 150
              const dx = Math.cos(angle) * dist
              const dy = Math.sin(angle) * dist

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    background: color,
                    boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}`,
                    left: 0,
                    top: 0,
                  }}
                  initial={{ x: 170, y: 170, opacity: 0, scale: 0 }}
                  animate={
                    phase === 'emerge'
                      ? {
                          x: cx,
                          y: cy,
                          opacity: 1,
                          scale: 1,
                        }
                      : phase === 'hold'
                      ? {
                          x: [cx, cx + Math.sin(i) * 4, cx],
                          y: [cy, cy + Math.cos(i) * 4, cy],
                          opacity: [1, 0.7, 1],
                          scale: [1, 1.3, 1],
                        }
                      : {
                          x: cx + dx,
                          y: cy + dy,
                          opacity: 0,
                          scale: 0,
                        }
                  }
                  transition={
                    phase === 'emerge'
                      ? { duration: 1.8, delay: i * 0.005, ease: [0.16, 1, 0.3, 1] }
                      : phase === 'hold'
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.003 }
                      : { duration: 1.5, delay: i * 0.003, ease: [0.4, 0, 1, 1] }
                  }
                />
              )
            })}
          </div>

          {/* Text */}
          <motion.div
            className="absolute bottom-[20%] left-0 right-0 text-center px-6 pointer-events-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase === 'emerge' ? 0 : 1, y: phase === 'emerge' ? 30 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <p
              className="text-3xl md:text-5xl lg:text-6xl font-script mb-4 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #c77dff, #ff006e, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(157,78,221,0.9))',
              }}
            >
              Some stories begin with a spark...
            </p>
            <motion.p
              className="text-2xl md:text-4xl font-elegant leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ff006e, #c77dff, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255,0,110,0.9))',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'emerge' ? 0 : 1, y: phase === 'emerge' ? 20 : 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            >
              Ours started years ago.
            </motion.p>
          </motion.div>

          {/* Sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute text-lg pointer-events-none select-none"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 2.5, delay: 1.5 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
