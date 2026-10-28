import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Search, ShieldCheck } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Fulano from './components/Fulano'
import { catalogCategories, commercialLines } from './data/products'
import { consultationMessage, whatsappUrl } from './config/contact'

function routeToHash(route) {
  const params = new URLSearchParams()
  if (route.page === 'line') return `#/line/${encodeURIComponent(route.lineId)}`
  if (route.page === 'legal') return `#/legal/${encodeURIComponent(route.section || 'terms')}`
  if (route.page === 'catalog' && route.query) params.set('q', route.query)
  if (route.page === 'contact' && route.context) {
    for (const key of ['lineId', 'productName', 'productCode', 'details']) {
      if (route.context[key]) params.set(key, route.context[key])
    }
  }
  const suffix = params.toString() ? `?${params}` : ''
  return `#/${route.page === 'home' ? '' : route.page}${suffix}`
}

function routeFromHash() {
  const [path = '', search = ''] = window.location.hash.replace(/^#\/?/, '').split('?')
  const [page = '', id] = path.split('/')
  const params = new URLSearchParams(search)
  if (page === 'line' && commercialLines.some(line => line.id === id)) return { page, lineId: id }
  if (page === 'catalog') return { page, query: params.get('q') || '' }
  if (page === 'contact') {
    return {
      page,
      context: {
        lineId: params.get('lineId') || '',
        productName: params.get('productName') || '',
        productCode: params.get('productCode') || '',
        details: params.get('details') || '',
      },
    }
  }
  if (['lines', 'how', 'about'].includes(page)) return { page }
  if (page === 'legal') return { page, section: id || 'terms' }
  return { page: 'home' }
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div></div>
}

const tickerNotices = [
  'Muebles, Deco y Bazar para la casa',
  'Perfumería para encontrar tu aroma',
  'Cotillón y Descartables para celebrar',
  'Textiles por encargo para tus proyectos',
  'Un tipo que te da una mano',
]

function NewspaperTicker() {
  const notices = [...tickerNotices, ...tickerNotices]
  return <section className="newspaper-ticker newspaper-desk" aria-label="Novedades de Fulano de Tal">
    <div className="paper-masthead"><span>EL DIARIO DE FULANO</span><b>Ideas · encuentros · proyectos</b><em>Una mano para cada cosa</em></div>
    <div className="ticker-track">{notices.map((notice, index) => <div className="ticker-notice" key={`${notice}-${index}`}><span>FULANO DICE</span><strong>{notice}</strong><b>✦</b></div>)}</div>
  </section>
}

function LineArtwork({ line }) {
  const subjects = {
    'muebles-deco-bazar': ['Muebles', 'Deco', 'Bazar'],
    perfumeria: ['Perfumería', 'Fragancias'],
    'cotillon-descartables': ['Celebraciones', 'Descartables'],
    'textiles-por-encargo': ['Empresas', 'Clubes', 'Instituciones', 'Eventos'],
  }[line.id] || [line.name]

  return <div className={`line-artwork line-artwork-${line.id}`} role="img" aria-label={`${line.name}: ${subjects.join(', ')}`}>
    {line.id === 'cotillon-descartables'
      ? <div className="party-disposable-art"><span>✦<b>Celebraciones</b></span><i aria-hidden="true">+</i><span>◌<b>Descartables</b></span></div>
      : <><span className="line-artwork-mark" aria-hidden="true">✦</span><strong>{line.name}</strong><small>{subjects.join(' · ')}</small></>}
  </div>
}

function Home({ navigate }) {
  const [featured, ...otherLines] = commercialLines
  return <main>
    <section className="hero hero-integrated">
      <NewspaperTicker/>
      <div className="hero-mini-ticker" aria-label="Líneas comerciales">
        <div className="hero-mini-ticker-track">{[...commercialLines, ...commercialLines].map((line, index) => <span className="hero-mini-ticker-item" key={`${line.id}-${index}`}>{line.name}<b>✦</b></span>)}</div>
      </div>
      <div className="hero-image hero-fulano-welcome">
        <img src={featured.image} alt="Fulano junto a un mueble de estilo vintage"/>
      </div>
      <div className="hero-copy">
        <div className="hero-tagline"><span>Fulano de Tal</span><strong>Un tipo que te da una mano.</strong></div>
        <span className="eyebrow">La línea principal</span>
        <h1>Muebles, Deco <em>y Bazar.</em></h1>
        <p>Ideas para tu casa, detalles para disfrutar y una atención de esas que se toman el tiempo. También podés preguntarnos por muebles, bazar e importados seleccionados.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => navigate('line', { lineId: featured.id })}>Conocer la línea <ArrowRight size={18}/></button>
          <button className="secondary" onClick={() => navigate('contact', { lineId: featured.id })}>Consultar con Fulano</button>
        </div>
        <div className="hero-trust-strip"><span><b>Un trato cercano</b><small>Atención personal</small></span><span><b>Todo conversado</b><small>Antes de avanzar</small></span></div>
      </div>
    </section>

    <section className="section worlds-section commercial-lines-section">
      <SectionTitle eyebrow="Las líneas de Fulano" title="Una buena idea para cada ocasión" text="La casa, una celebración, un proyecto o ese detalle que estabas buscando. Fulano te acompaña."/>
      <article className="world-card world-card-featured">
        <div className="world-image"><img src="ChatGPT Image 22 sept 2026, 13_19_07.png" alt="Fulano toma medidas para ayudar a elegir muebles"/><span>{featured.kicker}</span></div>
        <div className="world-body"><small>01 · LA CASA, A TU MANERA</small><h3>{featured.name}</h3><p className="world-summary">{featured.description}</p><button className="text-button world-cta" onClick={() => navigate('line', { lineId: featured.id })}>Conocer la línea <ArrowRight size={16}/></button></div>
      </article>
      <div className="world-grid">{otherLines.map((line, index) => <article className="world-card" key={line.id}>
        <LineArtwork line={line}/>
        <div className="world-body"><small>{String(index + 2).padStart(2, '0')} · FULANO DE TAL</small><h3>{line.name}</h3><p className="world-summary">{line.description}</p><button className="text-button world-cta" onClick={() => navigate('line', { lineId: line.id })}>Conocer la línea <ArrowRight size={16}/></button></div>
      </article>)}</div>
    </section>

    <section className="weekly-offer-slot" aria-label="Ofertas semanales de Fulano">
      <div className="mobile-offer-head"><span>EL DIARIO DE FULANO</span><small>Ofertas semanales</small></div>
      <article className="mobile-offer-card">
        <div className="mobile-offer-label">EL ESPACIO DE ESTA SEMANA</div>
        <div className="mobile-offer-copy"><strong>Una buena oportunidad se cuenta cuando está confirmada.</strong><p>Acá vas a encontrar las propuestas semanales de Fulano. Por ahora no hay ofertas publicadas.</p><blockquote>“Primero las cosas claras, después ponemos la pava.”</blockquote></div>
      </article>
    </section>

    <section className="coming-soon coming-soon-clean">
      <div className="coming-art"><img className="fulano-bike-image" src="fulano-bici.webp" alt="Fulano en bicicleta, buscando nuevas ideas"/></div>
      <div className="coming-copy"><span className="eyebrow">UN DETALLE MÁS</span><h2>¿Y si justo hay un beneficio?</h2><p className="coming-lead">En algunos muebles, bazar e importados seleccionados podría haber beneficios especiales. Preguntanos y te contamos si hay alguno disponible.</p><div className="coming-fulano"><b>Fulano dice:</b><span>“Preguntá nomás, que por preguntar no se pierde nada.”</span></div><button className="secondary" onClick={() => navigate('contact', { lineId: featured.id, details: 'Quisiera consultar si hay algún beneficio disponible.' })}>Consultar con Fulano</button></div>
    </section>

    <section className="section catalog-coming">
      <SectionTitle eyebrow="La vidriera" title="Elegir con calma" text="Estamos preparando una selección cuidada. Consultá por disponibilidad y condiciones de cada producto."/>
      <div className="catalog-coming-paper"><b>Fulano dice:</b><span>“Cuando algo está bien elegido, se nota.”</span><button className="secondary" onClick={() => navigate('catalog')}>Recorrer categorías</button></div>
    </section>

    <section className="section help-feature"><Fulano scene="list" onContact={() => navigate('contact')}/></section>
    <FAQ/>
    <section className="contact-strip contact-strip-final"><div><span className="eyebrow">Antes de irte</span><h2>¿Te quedó algo dando vueltas?</h2><p>Escribile a Fulano y lo vemos juntos.</p><button className="primary" onClick={() => navigate('contact')}>Consultar con Fulano</button></div><Fulano scene="phone"/></section>
  </main>
}

function Worlds({ navigate }) {
  const [featured, ...otherLines] = commercialLines
  return <main className="worlds-page">
    <section className="page-heading"><span className="eyebrow">Cuatro líneas, una misma atención</span><h1>¿Qué andás buscando?</h1><p>Muebles, Deco y Bazar es nuestra línea principal. También podés conocer Perfumería, Cotillón y Descartables, y Textiles por encargo.</p></section>
    <section className="section commercial-line-featured"><button className="world-hub-card world-hub-card-featured" onClick={() => navigate('line', { lineId: featured.id })}><span className="world-hub-image"><img src={featured.image} alt="Fulano junto a un mueble de estilo vintage"/><small>{featured.kicker}</small></span><span className="world-hub-copy"><strong>{featured.name}</strong><span>{featured.description}</span><em>Conocer la línea <ArrowRight size={16}/></em></span></button></section>
    <section className="section worlds-hub-grid">{otherLines.map(line => <button className="world-hub-card" key={line.id} onClick={() => navigate('line', { lineId: line.id })}><LineArtwork line={line}/><span className="world-hub-copy"><strong>{line.name}</strong><span>{line.description}</span><em>Conocer la línea <ArrowRight size={16}/></em></span></button>)}</section>
  </main>
}

function WorldPage({ worldId, navigate }) {
  const line = commercialLines.find(item => item.id === worldId)
  if (!line) return <main className="world-page"><section className="page-heading"><h1>Línea no encontrada</h1><button className="secondary" onClick={() => navigate('lines')}>Ver las cuatro líneas</button></section></main>
  return <main className="world-page">
    <section className="page-heading world-page-heading"><span className="eyebrow">{line.featured ? 'La línea principal' : 'Una línea para vos'}</span><h1>{line.name}</h1><p>{line.description}</p></section>
    <section className="section world-category-list">
      <div className="world-line-intro"><div><span className="eyebrow">Para empezar</span><h2>¿Qué tenés en mente?</h2><p>Elegí una categoría y preguntale a Fulano. Juntos vemos qué opciones hay y confirmamos disponibilidad y condiciones.</p></div><LineArtwork line={line}/></div>
      <div className="filters">{line.categories.map(category => <button type="button" key={category} onClick={() => navigate('contact', { lineId: line.id, details: `Quería consultar por ${category.toLowerCase()}.` })}>{category} <ArrowRight size={15}/></button>)}</div>
      {line.sellingProcess && <p className="seller-disclosure">{line.sellingProcess}</p>}
      {line.benefitNote && <p className="benefit-note">{line.benefitNote}</p>}
      <button className="primary" onClick={() => navigate('contact', { lineId: line.id })}>Consultar con Fulano</button>
    </section>
    <section className="section line-catalog-note"><span className="eyebrow">Una buena elección lleva su tiempo</span><h2>Consultá por disponibilidad y condiciones.</h2><p>Vamos a sumar productos a esta vidriera a medida que tengamos información confirmada.</p></section>
  </main>
}

function ConsultationPage({ context = {} }) {
  const [details, setDetails] = useState(context.details || '')
  const line = commercialLines.find(item => item.id === context.lineId)
  const message = consultationMessage(context, details, commercialLines)
  return <main className="contact-page">
    <section className="page-heading illustrated contact-heading"><div><span className="eyebrow">Escribile a Fulano</span><h1>¿Qué andás buscando?</h1><p>Dejame tu consulta y te respondo por WhatsApp. Cuanto más me cuentes, mejor te puedo orientar.</p><div className="contact-fulano"><b>Fulano dice:</b><span>Contame lo que tenés en mente y lo vemos juntos.</span></div></div><Fulano scene="phone"/></section>
    <section className="section contact-guide">
      {line && <p><strong>Línea:</strong> {line.name}</p>}
      {context.productName && <p><strong>Producto:</strong> {context.productName}{context.productCode && ` · Código: ${context.productCode}`}</p>}
      <label className="consultation-details"><span>Tu consulta</span><textarea value={details} onChange={event => setDetails(event.target.value)} placeholder="Contanos qué estás buscando, medidas, cantidad o detalles relevantes." rows={4}/></label>
      <p className="legal-note">Tu mensaje incluirá una referencia sugerida para que Fulano reconozca de qué línea viene tu consulta.</p>
      <a className="primary whatsapp-send" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp <ArrowRight size={17}/></a>
    </section>
  </main>
}

function Catalog({ query = '', onQueryChange, navigate }) {
  return <main className="catalog-page">
    <section className="page-heading catalog-heading"><span className="eyebrow">La vidriera de Fulano</span><h1>¿Qué andás buscando?</h1><p>Contanos qué tenés en mente o elegí una de las líneas.</p></section>
    <section className="catalog-controls catalog-controls-pro">
      <label className="catalog-search"><Search size={19}/><input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Buscar o describir lo que necesitás" aria-label="Buscar en el catálogo"/></label>
      <div className="filter-block"><small>Líneas y categorías</small><div className="filters">{commercialLines.map(line => <button type="button" key={line.id} onClick={() => navigate('line', { lineId: line.id })}>{line.name}</button>)}</div>
        <div className="filters">{catalogCategories.map(category => <button type="button" className="category-chip" key={`${category.lineId}-${category.id}`} onClick={() => navigate('line', { lineId: category.lineId })}>{category.name} <ArrowRight size={14}/></button>)}</div>
      </div>
    </section>
    <div className="empty catalog-empty"><Fulano scene="search"/><h2>{query ? `Todavía no hay productos publicados para “${query}”.` : 'La vidriera se llena con información confirmada.'}</h2><p>Cuando tengamos novedades, vas a encontrar productos con información clara. Si querés, podés preguntarle a Fulano.</p><button className="primary" onClick={() => navigate('contact', { details: query ? `Quería consultar por ${query}.` : '' })}>Consultar con Fulano</button></div>
  </main>
}

function How({ navigate }) {
  const steps = [
    ['1', 'Contás qué buscás', 'Elegí una línea y contale a Fulano qué te interesa.'],
    ['2', 'Fulano te asesora', 'Tu consulta llega directamente al WhatsApp de Fulano para que podamos orientarte.'],
    ['3', 'Confirmamos los detalles', 'Disponibilidad, precio, plazos y condiciones se conversan antes de avanzar.'],
    ['4', 'Coordinamos el paso siguiente', 'Si el producto es de Río Shop Deco, Fulano te acompaña en la consulta. Río Shop Deco vende, cobra y factura sus productos.'],
  ]
  return <main className="how-page"><section className="page-heading"><span className="eyebrow">Cómo consultar</span><h1>Una charla y le buscamos la vuelta.</h1><p>Contale a Fulano qué tenés en mente. Te ayudamos a averiguar opciones, disponibilidad y condiciones antes de avanzar.</p></section><section className="section how-steps">{steps.map(step => <article key={step[0]}><span>{step[0]}</span><div><h2>{step[1]}</h2><p>{step[2]}</p></div></article>)}</section><section className="section before-paying"><span className="eyebrow">Con las cosas claras</span><h2>Lo importante, siempre conversado.</h2><div className="before-paying-grid">{[['Precio y disponibilidad', 'Se confirman para cada producto.'], ['Plazos y entrega', 'Te contamos las opciones antes de avanzar.'], ['Condiciones', 'Cada consulta tiene sus detalles; los vemos juntos.'], ['Atención personal', 'Escribinos por WhatsApp y te damos una mano.']].map(item => <div key={item[0]}><ShieldCheck/><strong>{item[0]}</strong><p>{item[1]}</p></div>)}</div></section><section className="contact-strip"><div><span className="eyebrow">¿Tenés una consulta?</span><h2>Fulano está del otro lado.</h2><button className="primary" onClick={() => navigate('contact')}>Consultar con Fulano</button></div><Fulano scene="phone"/></section></main>
}

function About({ navigate }) {
  return <main className="about-page"><section className="page-heading illustrated about-heading"><div><span className="eyebrow">Quiénes somos</span><h1>Un tipo que te da una mano.</h1><p>En Fulano nos gusta escuchar, buscar opciones y ayudarte a elegir con tranquilidad.</p><div className="about-fulano"><b>Fulano dice:</b><span>“Primero averiguamos bien. Después vemos cómo seguimos.”</span></div></div><Fulano scene="hello"/></section><section className="section about-story"><div><span className="eyebrow">Cuatro líneas, una misma atención</span><h2>Una buena charla siempre ayuda.</h2></div><div><p><strong>Muebles, Deco y Bazar</strong> es nuestra línea principal. También encontrás Perfumería, Cotillón y Descartables, y Textiles por encargo.</p><p>Contanos qué necesitás y te orientamos. Consultamos disponibilidad y condiciones antes de avanzar.</p><p>Si se trata de un producto de Río Shop Deco, esa empresa realiza la venta, el cobro y la facturación de sus productos.</p></div></section><section className="contact-strip"><div><span className="eyebrow">Atención personal</span><h2>¿Qué andás buscando?</h2><button className="primary" onClick={() => navigate('lines')}>Conocer las líneas</button></div><Fulano scene="phone"/></section></main>
}

function FAQ() {
  const [open, setOpen] = useState(0)
  const items = [
    ['¿Ya hay productos y precios publicados?', 'Estamos armando una selección cuidada. Consultanos y vemos qué opciones hay.'],
    ['¿Cómo envío una consulta?', 'Escribile a Fulano desde el formulario y enviá el mensaje directamente por WhatsApp.'],
    ['¿Quién vende los productos de Río Shop Deco?', 'Fulano te orienta y, si el producto es de Río Shop Deco, esa empresa realiza la venta, el cobro y la facturación.'],
    ['¿Puedo consultar por Textiles por encargo?', 'Sí, contanos para qué empresa, club, institución o evento es tu proyecto y vemos cómo ayudarte.'],
  ]
  return <section className="section faq"><SectionTitle eyebrow="Preguntas frecuentes" title="Antes de avanzar, lo dejamos claro."/><div>{items.map((item, index) => <button className={open === index ? 'open' : ''} key={item[0]} onClick={() => setOpen(open === index ? -1 : index)}><span><strong>{item[0]}</strong><ChevronDown/></span>{open === index && <p>{item[1]}</p>}</button>)}</div></section>
}

function Legal({ section = 'terms' }) {
  const content = {
    terms: ['Términos de compra', 'Antes de confirmar una operación se informan precio, disponibilidad, plazo, forma de pago y modalidad de entrega aplicables.'],
    returns: ['Cambios y devoluciones', 'Los cambios, devoluciones y garantías se gestionan según el tipo de producto, las condiciones informadas y la normativa aplicable.'],
    privacy: ['Privacidad', 'Los datos compartidos para una consulta se utilizan para responderte y brindar atención vinculada con esa consulta.'],
    withdrawal: ['Botón de arrepentimiento', 'Si realizaste una compra a distancia y el derecho de revocación resulta aplicable, contactanos para iniciar la solicitud.'],
  }[section] || ['Información legal', 'Información de Fulano de Tal.']
  return <main className="legal-page"><section className="page-heading"><span className="eyebrow">Información legal</span><h1>{content[0]}</h1><p>Información clara, sin letra chica.</p></section><section className="section legal-content"><p>{content[1]}</p></section></main>
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash())
  const navigate = (destination, data) => {
    let next
    if (typeof destination === 'object') next = destination
    else if (destination === 'worlds') next = { page: 'lines' }
    else if (destination === 'world' || destination === 'line') next = { page: 'line', lineId: typeof data === 'string' ? data : data?.lineId }
    else if (destination === 'catalog') next = { page: 'catalog', query: typeof data === 'string' ? data : data?.query || '' }
    else if (destination === 'contact') next = { page: 'contact', context: typeof data === 'string' ? { details: data } : data || {} }
    else if (destination === 'legal') next = { page: 'legal', section: typeof data === 'string' ? data : 'terms' }
    else next = { page: destination }
    setRoute(next)
    window.history.pushState(null, '', routeToHash(next))
    window.scrollTo(0, 0)
  }
  const changeQuery = query => {
    const next = { ...route, query }
    setRoute(next)
    window.history.replaceState(null, '', routeToHash(next))
  }
  useEffect(() => {
    const onPop = () => setRoute(routeFromHash())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const page = route.page
  return <>
    <Header navigate={navigate} onSearch={query => navigate('catalog', { query })}/>
    {page === 'home' && <Home navigate={navigate}/>}
    {page === 'lines' && <Worlds navigate={navigate}/>}
    {page === 'line' && <WorldPage worldId={route.lineId} navigate={navigate}/>}
    {page === 'catalog' && <Catalog query={route.query || ''} onQueryChange={changeQuery} navigate={navigate}/>}
    {page === 'contact' && <ConsultationPage context={route.context}/>}
    {page === 'how' && <How navigate={navigate}/>}
    {page === 'about' && <About navigate={navigate}/>}
    {page === 'legal' && <Legal section={route.section}/>}
    <a className="contact-float" href={whatsappUrl('Hola, Fulano. Quisiera hacer una consulta.')} target="_blank" rel="noopener noreferrer" aria-label="Hablar por WhatsApp con Fulano">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
      <span>Hablar por WhatsApp</span>
    </a>
    <Footer navigate={navigate}/>
  </>
}
