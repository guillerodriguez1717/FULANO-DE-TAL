import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const basePath = `/${(process.env.SITE_BASE || '').replace(/^\/+|\/+$/g, '')}`.replace(/^\/$/, '/')
const assetPath = basePath === '/' ? '/' : `${basePath}/`
const cacheVersion = (process.env.GITHUB_SHA || Date.now().toString()).slice(0, 12)

rmSync('dist', { recursive: true, force: true }); rmSync('.build', { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.json'], { stdio: 'inherit' })
mkdirSync('dist/assets', { recursive: true }); mkdirSync('dist/vendor', { recursive: true })
cpSync('.build', 'dist/assets', { recursive: true }); cpSync('vendor', 'dist/vendor', { recursive: true }); cpSync('src/styles.css', 'dist/styles.css')
if (existsSync('public')) cpSync('public', 'dist', { recursive: true })
// Copy approved brand images stored at the repository root into the deploy output.
for (const brandImage of ['fulano-de-tal-logo-horizontal.png', 'fulano-de-tal-sello-redondo.png', 'fulano-bici.webp', 'file_00000000da08820ea26b112407de4c25.png']) {
  if (existsSync(brandImage)) cpSync(brandImage, join('dist', brandImage))
}
const javascriptFiles = readdirSync('dist/assets', { recursive: true })
  .filter(file => typeof file === 'string' && file.endsWith('.js'))

for (const file of javascriptFiles) {
  const path = join('dist/assets', file)
  const source = readFileSync(path, 'utf8')
    // styles.css is emitted separately and loaded by the generated HTML.
    .replace(/import\s+['"][^'"]+\.css['"];?\s*/g, '')
    // Browsers and GitHub Pages require the real filename for native ESM imports.
    .replace(/((?:from\s+|import\s+)["'])(\.{1,2}\/[^"']+)(["'])/g, (_, prefix, specifier, quote) => {
      const modulePath = specifier.endsWith('.jsx') ? `${specifier.slice(0, -4)}.js` : specifier
      return `${prefix}${extname(modulePath) ? modulePath : `${modulePath}.js`}${quote}`
    })
  writeFileSync(path, source)
}
const html=readFileSync('index.html','utf8')
  .replace('</head>', `    <base href="${assetPath}">\n  </head>`)
  .replace('<script type="module" src="/src/main.jsx"></script>',`<script type="importmap">{"imports":{"react":"${assetPath}vendor/react.js","react/jsx-runtime":"${assetPath}vendor/jsx-runtime.js","react-dom/client":"${assetPath}vendor/react-dom-client.js","lucide-react":"${assetPath}vendor/lucide-react.js"}}</script>\n    <link rel="stylesheet" href="${assetPath}styles.css?v=${cacheVersion}" />\n    <script type="module" src="${assetPath}assets/main.js?v=${cacheVersion}"></script>`)
writeFileSync('dist/index.html',html)
rmSync('.build',{recursive:true,force:true})
console.log(`Built static prototype in dist/ for ${assetPath}`)
