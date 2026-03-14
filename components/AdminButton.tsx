'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function AdminButton() {
  const [tapCount, setTapCount] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleLogoClick = () => {
    const next = tapCount + 1
    setTapCount(next)

    if (timerRef.current) clearTimeout(timerRef.current)

    if (next >= 5) {
      setShowLogin(true)
      setTapCount(0)
      return
    }

    timerRef.current = setTimeout(() => setTapCount(0), 2000)
  }

  const handleLogin = () => {
    if (password === 'emmjay') {
      setShowLogin(false)
      sessionStorage.setItem('adminAuth', 'emmjay')
      window.location.href = '/admin'
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  return (
    <>
      <button
        onClick={handleLogoClick}
        className="fixed top-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl select-none touch-manipulation"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,0,110,0.5)',
          boxShadow: '0 0 15px rgba(255,0,110,0.4)',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        💝
      </button>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass rounded-3xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h2 className="text-3xl font-serif text-center mb-6 glow-text">
                Admin Access
              </h2>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-white bg-opacity-10 rounded-xl px-6 py-4 text-lg mb-6 outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />

              <div className="flex gap-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
                <button
                  onClick={() => { setShowLogin(false); setPassword('') }}
                  className="flex-1 glass rounded-xl py-3 text-lg hover:bg-white hover:bg-opacity-10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
