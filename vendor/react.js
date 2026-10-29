let states = new Map(), calls = new Map(), redraw = () => {}
const effects = new Map()
export const Fragment = Symbol('Fragment')
export const StrictMode = ({ children }) => children
export function useState(initial) {
  const frame = new Error().stack.split('\n').find(line => line.includes('/assets/')) || 'state'
  const occurrence = calls.get(frame) || 0
  calls.set(frame, occurrence + 1)
  const key = `${frame}:${occurrence}`
  if (!states.has(key)) states.set(key, initial)
  return [states.get(key), value => {
    const current = states.get(key)
    const next = typeof value === 'function' ? value(current) : value
    if (Object.is(current, next)) return
    states.set(key, next)
    redraw()
  }]
}
export function useMemo(factory) { return factory() }
export function useEffect(effect, dependencies) {
  const frame = new Error().stack.split('\n').find(line => line.includes('/assets/')) || effect
  const occurrence = calls.get(frame) || 0
  calls.set(frame, occurrence + 1)
  const key = `${frame}:${occurrence}`
  const previous = effects.get(key)
  const changed = !previous
    || !dependencies
    || !previous.dependencies
    || dependencies.length !== previous.dependencies.length
    || dependencies.some((value, index) => !Object.is(value, previous.dependencies[index]))
  if (changed) {
    effects.set(key, { dependencies, cleanup: previous?.cleanup })
    queueMicrotask(() => {
      const current = effects.get(key)
      if (current?.cleanup) current.cleanup()
      const cleanup = effect()
      if (typeof cleanup === 'function') effects.set(key, { ...current, cleanup })
    })
  }
}
export function __begin(render) { calls = new Map(); redraw = render }
export default { Fragment }
