'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Romantic ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.4), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="text-center z-10 max-w-5xl mx-auto">
        {/* First name with elegant script */}
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-script mb-4 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(157, 78, 221, 0.3)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Mojolaoluwa
        </motion.h1>
        
        {/* Heart with pulse animation */}
        <motion.div
          className="my-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="text-6xl md:text-7xl inline-block"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.div>
          
          {/* Glowing rings around heart */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-pink-500" />
          </motion.div>
        </motion.div>
        
        {/* Second name with elegant script */}
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-script mb-12 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ff006e 0%, #f72585 50%, #ff006e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(255, 0, 110, 0.3)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Similoluwa
        </motion.h1>
        
        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{ width: '150px' }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          <motion.span
            className="text-3xl"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ✨
          </motion.span>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
            style={{ width: '150px' }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
            }}
          />
        </motion.div>
        
        {/* Subtitle with elegant font */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-elegant font-light italic max-w-3xl mx-auto leading-relaxed"
          style={{
            color: '#e0e0e0',
            textShadow: '0 2px 20px rgba(157, 78, 221, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A love story that waited for the right time
        </motion.p>
        
        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl pointer-events-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400 font-elegant">Scroll to explore our story</span>
          <motion.div
            className="text-3xl"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
