import assert from 'node:assert/strict'
import { createRoot } from '../vendor/react-dom-client.js'
import { Fragment, jsx, jsxs } from '../vendor/jsx-runtime.js'
import { useState } from '../vendor/react.js'

class FakeNode {
  constructor(type, namespaceURI = null) {
    this.type = type
    this.namespaceURI = namespaceURI
    this.parentNode = null
    this.children = []
  }

  get firstChild() {
    return this.children[0] || null
  }

  get nextSibling() {
    if (!this.parentNode) return null
    const siblings = this.parentNode.children
    return siblings[siblings.indexOf(this) + 1] || null
  }

  insertBefore(child, before) {
    if (child === before) return child
    if (child.parentNode) child.parentNode.removeChild(child)
    const index = before ? this.children.indexOf(before) : -1
    if (index < 0) this.children.push(child)
    else this.children.splice(index, 0, child)
    child.parentNode = this
    return child
  }

  removeChild(child) {
    const index = this.children.indexOf(child)
    if (index < 0) throw new Error('Node is not a child')
    this.children.splice(index, 1)
    child.parentNode = null
    return child
  }
}

class FakeElement extends FakeNode {
  constructor(type, namespaceURI = null) {
    super(type, namespaceURI)
    this.attributes = new Map()
    this.style = {}
    this.selectionStart = 0
    this._value = ''
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = String(value)
    this.selectionStart = this._value.length
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value))
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null
  }

  removeAttribute(name) {
    this.attributes.delete(name)
  }

  focus() {
    document.activeElement = this
  }

  dispatch(type, properties = {}) {
    const handler = this[`on${type}`]
    if (handler) handler({ ...properties, type, currentTarget: this, target: this, preventDefault() {} })
  }
}

class FakeText extends FakeNode {
  constructor(value) {
    super('#text')
    this.nodeValue = value
  }
}

globalThis.document = {
  activeElement: null,
  createElement: type => new FakeElement(type),
  createElementNS: (namespaceURI, type) => new FakeElement(type, namespaceURI),
  createTextNode: value => new FakeText(value),
}

const container = new FakeElement('root')
const root = createRoot(container)

function AppHarness() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [keyResult, setKeyResult] = useState('')
  return jsx('div', {
    children: jsxs(Fragment, {
      children: [
        jsx('input', {
          value: search,
          onChange: event => setSearch(event.currentTarget.value),
          onKeyDown: event => setKeyResult(event.key),
        }),
        jsx('textarea', {
          value: message,
          onChange: event => setMessage(event.currentTarget.value),
        }),
        jsx('output', { children: search }),
        jsx('a', { href: message, children: 'prepared WhatsApp message' }),
        jsx('output', { children: keyResult }),
      ],
    }),
  })
}

const render = () => root.render(jsx(AppHarness, {}))
render()
const input = container.firstChild.children[0]
const textarea = container.firstChild.children[1]
input.focus()

let typedSearch = ''
for (const character of 'continuo') {
  typedSearch += character
  input.value = typedSearch
  input.selectionStart = input.value.length
  input.dispatch('input')
  assert.equal(input.value, typedSearch)
  assert.equal(container.firstChild.children[2].firstChild.nodeValue, typedSearch, 'Search text must update after every input event')
  assert.equal(container.firstChild.children[0], input, 'Typing must not replace the input node')
  assert.equal(document.activeElement, input, 'Typing must preserve focus')
}

input.value = 'contiXnuo'
input.selectionStart = 6
input.dispatch('input')
assert.equal(input.selectionStart, 6, 'Editing in the middle must preserve the cursor')
assert.equal(container.firstChild.children[2].firstChild.nodeValue, 'contiXnuo')
input.value = 'contiXno'
input.selectionStart = 6
input.dispatch('input')
assert.equal(input.value, 'contiXno', 'Deleting characters must update controlled input state')
input.dispatch('keydown', { key: 'Enter' })
assert.equal(container.firstChild.children[4].firstChild.nodeValue, 'Enter', 'Keyboard events must continue to work after redraws')
assert.equal(document.activeElement, input, 'Keyboard updates must preserve focus')

textarea.focus()
let typedMessage = ''
for (const character of 'consulta') {
  typedMessage += character
  textarea.value = typedMessage
  textarea.selectionStart = textarea.value.length
  textarea.dispatch('input')
  assert.equal(textarea.value, typedMessage)
  assert.equal(container.firstChild.children[1], textarea, 'Textarea updates must not replace its node')
  assert.equal(document.activeElement, textarea, 'Textarea typing must preserve focus')
}
assert.equal(container.firstChild.children[3].getAttribute('href'), 'consulta', 'Prepared WhatsApp content must update while typing')
textarea.value = ''
textarea.selectionStart = 0
textarea.dispatch('input')
assert.equal(textarea.value, '', 'Clearing the consultation must update the prepared message state')
assert.equal(container.firstChild.children[3].getAttribute('href'), '')

console.log('Runtime input, cursor, focus, deletion, and keyboard checks passed.')
