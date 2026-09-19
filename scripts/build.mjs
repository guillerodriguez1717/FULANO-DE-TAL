import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
rmSync('dist', { recursive: true, force: true }); rmSync('.build', { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.json'], { stdio: 'inherit' })
mkdirSync('dist/assets', { recursive: true }); mkdirSync('dist/vendor', { recursive: true })
cpSync('.build', 'dist/assets', { recursive: true }); cpSync('vendor', 'dist/vendor', { recursive: true }); cpSync('src/styles.css', 'dist/styles.css')
cpSync('public', 'dist', { recursive: true })
for (const file of ['App.js','main.js','components/Footer.js','components/Fulano.js','components/FulanoHelp.js','components/Header.js','components/Logo.js','components/ProductCard.js','data/products.js']) {
  const path=`dist/assets/${file}`; let source=readFileSync(path,'utf8').replaceAll('.jsx"','.js"').replaceAll(".jsx'",".js'"); writeFileSync(path,source)
}
const html=readFileSync('index.html','utf8').replace('<script type="module" src="/src/main.jsx"></script>',`<script type="importmap">{"imports":{"react":"/vendor/react.js","react/jsx-runtime":"/vendor/jsx-runtime.js","react-dom/client":"/vendor/react-dom-client.js","lucide-react":"/vendor/lucide-react.js"}}</script>\n    <link rel="stylesheet" href="/styles.css" />\n    <script type="module" src="/assets/main.js"></script>`)
writeFileSync('dist/index.html',html)
rmSync('.build',{recursive:true,force:true})
console.log('Built static prototype in dist/')
