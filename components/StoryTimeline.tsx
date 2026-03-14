'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const timelineSteps = [
  {
    title: 'Secondary School Days',
    description: 'We knew each other back then… but love had not yet spoken.',
    emoji: '📚',
    color: '#9d4edd'
  },
  {
    title: 'Time Passed',
    description: 'Life took us on different paths. The stars were still aligning.',
    emoji: '⏳',
    color: '#7209b7'
  },
  {
    title: 'The Reunion',
    description: 'Somehow, life brought us back. Destiny had its own plan.',
    emoji: '✨',
    color: '#f72585'
  },
  {
    title: 'The Beginning of Us',
    description: 'Now our story truly begins. This is where forever starts.',
    emoji: '💕',
    color: '#ff006e'
  }
]

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  return (
    <section ref={containerRef} className="relative py-32 px-4">
      <motion.h2
        className="text-5xl md:text-7xl font-serif text-center mb-20 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Journey
      </motion.h2>
      
      <div className="max-w-4xl mx-auto space-y-32">
        {timelineSteps.map((step, index) => {
          const targetScale = 1 - ((timelineSteps.length - index) * 0.05)
          
          return (
            <motion.div
              key={index}
              className="glass rounded-3xl p-6 md:p-12 relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              style={{
                boxShadow: `0 0 40px ${step.color}40`
              }}
            >
              <div className="text-6xl mb-6">{step.emoji}</div>
              <h3 className="text-2xl md:text-4xl font-serif mb-4" style={{ color: step.color }}>
                {step.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-300 font-serif italic">
                {step.description}
              </p>
              
              <motion.div
                className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${step.color}40, transparent)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
