import { __begin, Fragment } from './react.js'

function expandChildren(value, children = []) {
  if (value == null || value === false || value === true) return children
  if (Array.isArray(value)) {
    value.forEach(child => expandChildren(child, children))
    return children
  }
  if (typeof value !== 'object') {
    children.push({ type: '#text', value: String(value), key: null })
    return children
  }
  if (typeof value.type === 'function') {
    const start = children.length
    expandChildren(value.type(value.props || {}), children)
    if (value.key != null && children.length > start) {
      children[start] = { ...children[start], key: value.key }
    }
    return children
  }
  if (value.type === Fragment) {
    return expandChildren(value.props?.children, children)
  }
  children.push(value)
  return children
}

function eventName(name) {
  if (name === 'onChange') return 'oninput'
  return `on${name.slice(2).toLowerCase()}`
}

function updateProperty(element, name, value, previous) {
  if (name === 'children' || name === 'key') return
  if (name.startsWith('on')) {
    const property = eventName(name)
    if (typeof value === 'function') element[property] = value
    else if (typeof previous === 'function') element[property] = null
    return
  }
  if (name === 'style') {
    if (previous && typeof previous === 'object') {
      for (const styleName of Object.keys(previous)) {
        if (!(styleName in (value || {}))) element.style[styleName] = ''
      }
    }
    if (value && typeof value === 'object') Object.assign(element.style, value)
    return
  }
  if (name === 'value' || name === 'checked' || name === 'selected') {
    if (value == null || value === false) {
      if (name in element) element[name] = name === 'value' ? '' : false
      element.removeAttribute(name)
    } else {
      if (element[name] !== value) element[name] = value
      if (value === true) element.setAttribute(name, '')
      else element.removeAttribute(name)
    }
    return
  }
  const attribute = name === 'className' ? 'class' : name === 'htmlFor' ? 'for' : name
  if (value == null || value === false) element.removeAttribute(attribute)
  else if (value === true) element.setAttribute(attribute, '')
  else if (previous !== value || element.getAttribute(attribute) !== String(value)) {
    element.setAttribute(attribute, String(value))
  }
}

function compatible(oldNode, newNode) {
  return oldNode && oldNode.type === newNode.type && oldNode.key === newNode.key
}

function patchNode(parent, oldNode, newNode, before = null) {
  if (!compatible(oldNode, newNode)) {
    const svgNamespace = 'http://www.w3.org/2000/svg'
    const created = newNode.type === '#text'
      ? document.createTextNode(newNode.value)
      : parent.namespaceURI === svgNamespace || newNode.type === 'svg'
        ? document.createElementNS(svgNamespace, newNode.type)
        : document.createElement(newNode.type)
    newNode._dom = created
    if (newNode.type !== '#text') {
      for (const [name, value] of Object.entries(newNode.props || {})) {
        updateProperty(created, name, value, undefined)
      }
      newNode._children = reconcileChildren(created, [], expandChildren(newNode.props?.children))
    }
    parent.insertBefore(created, before || oldNode?._dom || null)
    if (oldNode?._dom?.parentNode === parent) parent.removeChild(oldNode._dom)
    return created
  }

  const element = oldNode._dom
  newNode._dom = element
  if (newNode.type === '#text') {
    if (oldNode.value !== newNode.value) element.nodeValue = newNode.value
    return element
  }
  const previousProps = oldNode.props || {}
  const nextProps = newNode.props || {}
  for (const name of Object.keys(previousProps)) {
    if (!(name in nextProps)) updateProperty(element, name, null, previousProps[name])
  }
  for (const [name, value] of Object.entries(nextProps)) {
    if (name !== 'children') updateProperty(element, name, value, previousProps[name])
  }
  newNode._children = reconcileChildren(
    element,
    oldNode._children || [],
    expandChildren(nextProps.children),
  )
  return element
}

function reconcileChildren(parent, oldChildren, newChildren) {
  const unmatched = new Set(oldChildren)
  let cursor = parent.firstChild
  const result = []

  newChildren.forEach((newChild, index) => {
    let oldChild
    if (newChild.key != null) {
      oldChild = oldChildren.find(child => unmatched.has(child) && child.key === newChild.key && child.type === newChild.type)
    } else {
      const atIndex = oldChildren[index]
      if (atIndex && unmatched.has(atIndex) && atIndex.key == null && atIndex.type === newChild.type) {
        oldChild = atIndex
      } else {
        oldChild = oldChildren.find(child => unmatched.has(child) && child.key == null && child.type === newChild.type)
      }
    }
    if (oldChild) unmatched.delete(oldChild)
    const element = patchNode(parent, oldChild, newChild, cursor)
    if (element !== cursor) parent.insertBefore(element, cursor)
    cursor = element.nextSibling
    result.push(newChild)
  })

  for (const child of unmatched) {
    if (child._dom?.parentNode === parent) parent.removeChild(child._dom)
  }
  return result
}

export function createRoot(container) {
  const root = {
    render(vnode) {
      const draw = () => {
        __begin(draw)
        root.children = reconcileChildren(container, root.children || [], expandChildren(root.vnode))
      }
      root.vnode = vnode
      draw()
    },
  }
  return root
}
