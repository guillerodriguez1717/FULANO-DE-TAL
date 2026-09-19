import { __begin, Fragment } from './react.js'
function append(parent, vnode) {
  if (vnode == null || vnode === false || vnode === true) return
  if (Array.isArray(vnode)) { vnode.forEach(v => append(parent, v)); return }
  if (typeof vnode === 'string' || typeof vnode === 'number') { parent.append(document.createTextNode(vnode)); return }
  if (typeof vnode.type === 'function') { append(parent, vnode.type(vnode.props)); return }
  if (vnode.type === Fragment) { append(parent, vnode.props.children); return }
  const el = document.createElement(vnode.type)
  for (const [name, value] of Object.entries(vnode.props || {})) {
    if (name === 'children' || value == null || value === false) continue
    if (name === 'className') el.className = value
    else if (name === 'htmlFor') el.htmlFor = value
    else if (name === 'style' && typeof value === 'object') Object.assign(el.style, value)
    else if (name.startsWith('on') && typeof value === 'function') el.addEventListener(name.slice(2).toLowerCase(), value)
    else if (name === 'value') el.value = value
    else if (name === 'checked') el.checked = value
    else if (value === true) el.setAttribute(name, '')
    else el.setAttribute(name, value)
  }
  append(el, vnode.props?.children)
  parent.append(el)
}
export function createRoot(container) { const root = { render(vnode) { root.vnode = vnode; const draw = () => { __begin(draw); container.replaceChildren(); append(container, root.vnode) }; draw() } }; return root }
