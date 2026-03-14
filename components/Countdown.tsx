'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  useEffect(() => {
    // Set target date (example: 90 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 90)
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-serif mb-8 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Until We Meet Again
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-2xl font-serif text-purple-300 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Every second brings us closer
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="glass rounded-3xl p-8 glow-box"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="text-4xl sm:text-5xl md:text-7xl font-bold glow-text mb-4"
                key={item.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-lg md:text-xl text-purple-300 font-serif">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
