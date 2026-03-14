import { NextResponse } from 'next/server'

// JSONBin.io - free persistent storage
// Uses environment variable JSONBIN_API_KEY and JSONBIN_BIN_ID
// Falls back to in-memory if not configured (for local dev)

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || ''
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || ''
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`

interface Message {
  id: string
  text: string
  timestamp: string
  expiresAt: string
  type: 'text'
  isAuto?: boolean
}

interface VoiceNote {
  id: string
  url: string
  timestamp: string
  duration?: number
  type: 'voice'
}

interface Store {
  messages: Message[]
  voiceNotes: VoiceNote[]
}

// In-memory fallback for local dev
let localStore: Store = { messages: [], voiceNotes: [] }

async function readStore(): Promise<Store> {
  if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
    return localStore
  }
  try {
    const res = await fetch(JSONBIN_URL + '/latest', {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
        'X-Bin-Meta': 'false',
      },
      cache: 'no-store',
    })
    if (!res.ok) return { messages: [], voiceNotes: [] }
    const data = await res.json()
    return data as Store
  } catch {
    return { messages: [], voiceNotes: [] }
  }
}

async function writeStore(store: Store): Promise<void> {
  if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
    localStore = store
    return
  }
  try {
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify(store),
    })
  } catch (err) {
    console.error('Failed to write store:', err)
  }
}

function cleanExpired(messages: Message[]): Message[] {
  const now = Date.now()
  return messages.filter(m => new Date(m.expiresAt).getTime() > now)
}

export async function GET() {
  const store = await readStore()
  store.messages = cleanExpired(store.messages)
  return NextResponse.json({
    messages: store.messages,
    voiceNotes: store.voiceNotes,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const store = await readStore()
    store.messages = cleanExpired(store.messages)
    const now = new Date()

    if (body.type === 'voice') {
      const voiceNote: VoiceNote = {
        id: `voice_${Date.now()}`,
        url: body.url,
        timestamp: now.toISOString(),
        duration: body.duration,
        type: 'voice',
      }
      store.voiceNotes.unshift(voiceNote)
      await writeStore(store)
      return NextResponse.json({ success: true, voiceNote })
    } else {
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      const message: Message = {
        id: `msg_${Date.now()}`,
        text: body.text,
        timestamp: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        type: 'text',
        isAuto: body.isAuto || false,
      }
      store.messages.unshift(message)
      if (store.messages.length > 50) store.messages = store.messages.slice(0, 50)
      await writeStore(store)
      return NextResponse.json({ success: true, message })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add message' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const store = await readStore()

    if (type === 'voice') {
      store.voiceNotes = store.voiceNotes.filter(v => v.id !== id)
    } else {
      store.messages = store.messages.filter(m => m.id !== id)
    }

    await writeStore(store)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
