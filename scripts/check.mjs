import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { commercialLines, getPublishedOffers, isPublishedProduct, offers, products, publishedOffers, publishedProducts, searchPublishedProducts } from '../src/data/products.js'
import { WHATSAPP_NUMBER, consultationMessage, whatsappUrl } from '../src/config/contact.js'

assert.deepEqual(commercialLines.map(line => line.name), [
  'Muebles, Deco y Bazar',
  'Perfumería',
  'Cotillón y Descartables',
  'Textiles por encargo',
])
assert.deepEqual(commercialLines[2].categories, ['Cotillón', 'Decoración para fiestas', 'Descartables'])
assert.equal(products.length, 0, 'Preview must not publish unconfirmed products')
assert.equal(offers.length, 0, 'Preview must not publish unconfirmed offers')
assert.equal(publishedProducts.length, 0, 'No products should be public until approved and published')
assert.equal(publishedOffers.length, 0, 'No offers should be public without an approved product')
assert.deepEqual(searchPublishedProducts({ query: 'muebles' }), [], 'Search must only inspect published products')
assert.equal(isPublishedProduct({ id: 'draft', name: 'Borrador', lineId: commercialLines[0].id, category: 'Muebles', image: 'draft.png', approvalStatus: 'approved', publicationStatus: 'draft' }), false)
assert.equal(isPublishedProduct({ id: 'unapproved', name: 'No aprobado', lineId: commercialLines[0].id, category: 'Muebles', image: 'product.png', approvalStatus: 'pending', publicationStatus: 'published' }), false)
assert.equal(isPublishedProduct({ id: 'missing-image', name: 'Sin foto', lineId: commercialLines[0].id, category: 'Muebles', image: '', approvalStatus: 'approved', publicationStatus: 'published' }), false)
assert.equal(isPublishedProduct({ id: 'missing-code', name: 'Sin código', lineId: commercialLines[0].id, category: 'Muebles', image: 'product.png', approvalStatus: 'approved', publicationStatus: 'published' }), false)
assert.equal(isPublishedProduct({ id: 'authorized-fixture', name: 'Producto de prueba', productCode: 'TEST-1', lineId: commercialLines[0].id, category: 'Muebles', image: 'product.png', approvalStatus: 'approved', publicationStatus: 'published' }), true)
const approvedFixture = { id: 'approved-fixture', approvalStatus: 'approved', publicationStatus: 'published' }
const validOfferFixture = { id: 'valid-fixture', productId: approvedFixture.id, approvalStatus: 'approved', publicationStatus: 'published', startDate: '2026-10-28', expiresOn: '2026-10-30' }
const expiredOfferFixture = { ...validOfferFixture, id: 'expired-fixture', expiresOn: '2026-10-28' }
const draftOfferFixture = { ...validOfferFixture, id: 'draft-fixture', publicationStatus: 'draft' }
assert.deepEqual(getPublishedOffers(new Date(2026, 9, 29, 12), [validOfferFixture, expiredOfferFixture, draftOfferFixture], [approvedFixture]), [validOfferFixture], 'Offers must be approved, linked to a published product, and within dates')
assert.equal(WHATSAPP_NUMBER, '5493572546583')
for (const line of commercialLines) {
  const message = consultationMessage({ lineId: line.id }, 'Necesito más información', commercialLines)
  const link = new URL(whatsappUrl(message))
  assert.equal(link.origin, 'https://wa.me')
  assert.equal(link.pathname, `/${WHATSAPP_NUMBER}`)
  assert.equal(link.searchParams.get('text'), message, `WhatsApp message should retain its context for ${line.name}`)
  assert.match(message, new RegExp(line.name))
}
const productMessage = consultationMessage({
  lineId: commercialLines[0].id,
  productName: 'Mesa de ejemplo',
  productCode: 'MDB-42',
}, '', commercialLines)
assert.match(productMessage, /Producto: Mesa de ejemplo/)
assert.match(productMessage, /Código de producto: MDB-42/)
assert.match(whatsappUrl(productMessage), /%0A/)
const appSource = readFileSync('src/App.jsx', 'utf8')
const productsSource = readFileSync('src/data/products.js', 'utf8')
const stylesSource = readFileSync('src/styles.css', 'utf8')
const homeSource = appSource.slice(appSource.indexOf('function Home'), appSource.indexOf('function Worlds'))
assert.match(appSource, /commercialLines\.map/)
assert.match(appSource, /page === 'line'.*WorldPage/s)
assert.match(appSource, /page === 'contact'.*ConsultationPage/s)
assert.match(appSource, /window.addEventListener\('popstate', onPop\)/)
assert.match(appSource, /window.history.pushState/)
assert.match(appSource, /window.history.replaceState/)
assert.match(appSource, /searchPublishedProducts\(\{ lineId: line\.id, category: selectedCategory \}\)/)
assert.match(appSource, /searchPublishedProducts\(\{ query, lineId, category \}\)/)
assert.match(appSource, /href=\{whatsappUrl\(message\)\}/)
assert.match(appSource, /className="newspaper-ticker newspaper-desk"/)
assert.match(appSource, /className="weekly-offer-slot"/)
assert.doesNotMatch(appSource, /className="[^"]*mobile-weekly-offers/)
assert.match(appSource, /Por ahora no hay ofertas publicadas/)
assert.match(appSource, /src="ChatGPT Image 22 sept 2026, 13_19_07\.png"/)
assert.equal((homeSource.match(/src={featured\.image}/g) || []).length, 1, 'Homepage should use the hero illustration only once')
assert.ok(existsSync('ChatGPT Image 22 sept 2026, 13_19_07.png'), 'The alternate existing Fulano illustration must be available')
assert.doesNotMatch(homeSource, /weeklyOfferIndex|setInterval/, 'Weekly offers must not rotate through unconfirmed promotions')
assert.match(appSource, /href=\{whatsappUrl\(floatingMessage\)\}/)
assert.match(appSource, /<span>Hablar por WhatsApp<\/span>/)
const floatMessageUrl = new URL(whatsappUrl(consultationMessage({}, '', commercialLines)))
assert.equal(floatMessageUrl.pathname, `/${WHATSAPP_NUMBER}`)
assert.equal(floatMessageUrl.searchParams.get('text'), consultationMessage({}, '', commercialLines))
assert.match(stylesSource, /animation:fulano-paper-desk 42s linear infinite/)
assert.match(stylesSource, /\.hero-mini-ticker-track\{\s*animation-duration:34s/)
assert.match(stylesSource, /prefers-reduced-motion:reduce[\s\S]*?\.hero-mini-ticker-track\{animation:none\}/)
assert.match(stylesSource, /\.contact-float\{\s*position:fixed/)
assert.match(stylesSource, /\.contact-float\{[^}]*background:#25d366/s)
assert.match(stylesSource, /@media\(max-width:700px\)[\s\S]*?\.contact-float\{[^}]*font-size:0/s)
assert.doesNotMatch(appSource, /Mariano|comisi[oó]n|negociaci[oó]n/)
assert.doesNotMatch(appSource + productsSource, /beneficios especiales|benefitNote/)

execFileSync('node',['--check','scripts/build.mjs'],{stdio:'inherit'})
execFileSync('node',['--check','vendor/react-dom-client.js'],{stdio:'inherit'})
execFileSync('node',['--check','vendor/react.js'],{stdio:'inherit'})
execFileSync('node',['scripts/runtime-check.mjs'],{stdio:'inherit'})
execFileSync('tsc',['-p','tsconfig.json','--noEmit'],{stdio:'inherit'})
execFileSync('node',['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,SITE_BASE:'/FULANO-DE-TAL/'}})
const html = readFileSync('dist/index.html', 'utf8')
for (const expected of ['/FULANO-DE-TAL/assets/main.js', '/FULANO-DE-TAL/styles.css', '/FULANO-DE-TAL/vendor/react.js']) {
  if (!html.includes(expected)) throw new Error(`Missing GitHub Pages path: ${expected}`)
}
for (const match of html.matchAll(/["']\/FULANO-DE-TAL\/([^"']+)["']/g)) {
  const cleanPath = match[1].split('?')[0]
  const outputPath = join('dist', cleanPath)
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
// Restore root-based assets for the local preview after checking the Pages build.
execFileSync('node', ['scripts/build.mjs'], { stdio: 'inherit', env: { ...process.env, SITE_BASE: '' } })
console.log('Source and build scripts validated.')
