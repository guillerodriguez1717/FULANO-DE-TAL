import { Fragment } from './react.js'
export function jsx(type, props, key) { return { type, props: props || {}, key } }
export const jsxs = jsx
export { Fragment }
