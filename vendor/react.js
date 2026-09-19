let states = new Map(), calls = new Map(), redraw = () => {}
const effects = new Set()
export const Fragment = Symbol('Fragment')
export const StrictMode = ({ children }) => children
export function useState(initial) {
  const frame = new Error().stack.split('\n').find(line => line.includes('/assets/')) || 'state'
  const occurrence = calls.get(frame) || 0
  calls.set(frame, occurrence + 1)
  const key = `${frame}:${occurrence}`
  if (!states.has(key)) states.set(key, initial)
  return [states.get(key), value => { const current = states.get(key); states.set(key, typeof value === 'function' ? value(current) : value); redraw() }]
}
export function useMemo(factory) { return factory() }
export function useEffect(effect) { const key = new Error().stack.split('\n').find(line => line.includes('/assets/')) || effect; if (!effects.has(key)) { effects.add(key); queueMicrotask(effect) } }
export function __begin(render) { calls = new Map(); redraw = render }
export default { Fragment }
