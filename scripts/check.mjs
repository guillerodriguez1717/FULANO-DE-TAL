import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
execFileSync('node',['--check','scripts/build.mjs'],{stdio:'inherit'})
execFileSync('tsc',['-p','tsconfig.json','--noEmit'],{stdio:'inherit'})
execFileSync('node',['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,SITE_BASE:'/FULANO-DE-TAL/'}})
const html = readFileSync('dist/index.html', 'utf8')
for (const expected of ['/FULANO-DE-TAL/assets/main.js', '/FULANO-DE-TAL/styles.css', '/FULANO-DE-TAL/vendor/react.js']) {
  if (!html.includes(expected)) throw new Error(`Missing GitHub Pages path: ${expected}`)
}
for (const match of html.matchAll(/["']\/FULANO-DE-TAL\/([^"']+)["']/g)) {
  const outputPath = join('dist', match[1])
  if (!existsSync(outputPath)) throw new Error(`HTML references missing output: ${outputPath}`)
}

const javascriptFiles = readdirSync('dist', { recursive: true })
  .filter(file => typeof file === 'string' && file.endsWith('.js'))

for (const file of javascriptFiles) {
  const path = join('dist', file)
  const source = readFileSync(path, 'utf8')
  if (/import\s+['"][^'"]+\.css['"]/.test(source)) throw new Error(`CSS import left in ${path}`)
  for (const match of source.matchAll(/(?:from\s+|import\s+)["'](\.{1,2}\/[^"']+)["']/g)) {
    const specifier = match[1]
    if (extname(specifier) !== '.js') throw new Error(`Module import has no .js extension in ${path}: ${specifier}`)
    const importedFile = resolve(dirname(path), specifier)
    if (!existsSync(importedFile)) throw new Error(`Missing module imported by ${path}: ${importedFile}`)
  }
}
console.log('Source and build scripts validated.')
