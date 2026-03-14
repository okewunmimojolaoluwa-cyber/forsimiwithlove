'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicFile, setMusicFile] = useState('/music/love-song.mp3')
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    fetch('/api/admin/music')
      .then(res => res.json())
      .then(data => {
        if (data.currentMusic) {
          setMusicFile(`/music/${data.currentMusic}?t=${Date.now()}`)
        }
      })
      .catch(() => {})
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <audio ref={audioRef} loop key={musicFile}>
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl select-none touch-manipulation"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(157,78,221,0.5)',
          boxShadow: isPlaying
            ? '0 0 25px rgba(157,78,221,0.8)'
            : '0 0 15px rgba(157,78,221,0.4)',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {isPlaying ? '🔊' : '🎵'}
      </button>
    </>
  )
}
