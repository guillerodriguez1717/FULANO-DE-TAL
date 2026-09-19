import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const basePath = `/${(process.env.SITE_BASE || '').replace(/^\/+|\/+$/g, '')}`.replace(/^\/$/, '/')
const assetPath = basePath === '/' ? '/' : `${basePath}/`

rmSync('dist', { recursive: true, force: true }); rmSync('.build', { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.json'], { stdio: 'inherit' })
mkdirSync('dist/assets', { recursive: true }); mkdirSync('dist/vendor', { recursive: true })
cpSync('.build', 'dist/assets', { recursive: true }); cpSync('vendor', 'dist/vendor', { recursive: true }); cpSync('src/styles.css', 'dist/styles.css')
if (existsSync('public')) cpSync('public', 'dist', { recursive: true })
for (const file of ['App.js','main.js','components/Footer.js','components/Fulano.js','components/FulanoHelp.js','components/Header.js','components/Logo.js','components/ProductCard.js','data/products.js']) {
  const path=`dist/assets/${file}`; let source=readFileSync(path,'utf8').replaceAll('.jsx"','.js"').replaceAll(".jsx'",".js'"); writeFileSync(path,source)
}
const html=readFileSync('index.html','utf8')
  .replace('</head>', `    <base href="${assetPath}">\n  </head>`)
  .replace('<script type="module" src="/src/main.jsx"></script>',`<script type="importmap">{"imports":{"react":"${assetPath}vendor/react.js","react/jsx-runtime":"${assetPath}vendor/jsx-runtime.js","react-dom/client":"${assetPath}vendor/react-dom-client.js","lucide-react":"${assetPath}vendor/lucide-react.js"}}</script>\n    <link rel="stylesheet" href="${assetPath}styles.css" />\n    <script type="module" src="${assetPath}assets/main.js"></script>`)
writeFileSync('dist/index.html',html)
rmSync('.build',{recursive:true,force:true})
console.log(`Built static prototype in dist/ for ${assetPath}`)
