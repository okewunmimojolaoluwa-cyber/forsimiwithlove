'use client'

import { motion } from 'framer-motion'

const floatingHearts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${10 + i * 8}%`,
  delay: i * 0.8,
  duration: 8 + (i % 4),
}))

export default function FinalScene() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        className="text-center z-10 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <motion.p
          className="text-2xl sm:text-3xl md:text-5xl font-serif text-purple-300 mb-12 px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          This is just the beginning of our story...
        </motion.p>

        <motion.div
          className="text-6xl md:text-8xl mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
        </motion.div>

        <motion.div
          className="text-2xl sm:text-4xl md:text-6xl font-serif flex flex-wrap items-center justify-center gap-2 px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="glow-text">Mojolaoluwa</span>
          <span className="text-pink-500">❤️</span>
          <span className="glow-text">Similoluwa</span>
        </motion.div>

        <motion.p
          className="text-lg md:text-2xl font-serif text-gray-400 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
        >
          Forever and always
        </motion.p>
      </motion.div>

      {/* Floating hearts - no window reference */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-3xl pointer-events-none"
          style={{ left: heart.left, bottom: '-60px' }}
          animate={{ y: [0, -800], opacity: [0, 1, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          💕
        </motion.div>
      ))}
    </section>
  )
}
