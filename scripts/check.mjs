import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
execFileSync('node',['--check','scripts/build.mjs'],{stdio:'inherit'})
execFileSync('tsc',['-p','tsconfig.json','--noEmit'],{stdio:'inherit'})
execFileSync('node',['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,SITE_BASE:'/FULANO-DE-TAL/'}})
const html = readFileSync('dist/index.html', 'utf8')
for (const expected of ['/FULANO-DE-TAL/assets/main.js', '/FULANO-DE-TAL/styles.css', '/FULANO-DE-TAL/vendor/react.js']) {
  if (!html.includes(expected)) throw new Error(`Missing GitHub Pages path: ${expected}`)
}
console.log('Source and build scripts validated.')
