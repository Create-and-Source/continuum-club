// Simple localStorage-backed store for demo persistence

const PREFIX = 'cc_'

export function get(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage full or unavailable
  }
}

export function update(key, fallback, fn) {
  const current = get(key, fallback)
  const next = fn(current)
  set(key, next)
  return next
}

// Convenience: increment a number
export function increment(key, fallback = 0) {
  return update(key, fallback, v => v + 1)
}

// Clear all app data
export function clearAll() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k))
}
