import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, PackageCheck, Ruler, Search, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import FulanoHelp from './components/FulanoHelp'
import Fulano from './components/Fulano'
import { BrandSeal } from './components/Logo'
import { categories, formatPrice, products } from './data/products'

const WHATSAPP_NUMBER = '5493572546583' // Número centralizado: reemplazar acá cuando Fulano tenga línea propia.
const CONTACT_EMAIL = 'guillerodriguez1717@gmail.com' // Correo provisorio: reemplazar acá cuando Fulano tenga email propio.
const openWhatsApp = (message) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')

function SectionTitle({ eyebrow, title, text, action }) { return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div> }

const newspaperNotices = [
  'OFERTA DE LA SEMANA · Mirá las oportunidades bajo pedido',
  'PRECIO ESPECIAL · Consultá promociones disponibles',
  'Muebles a pedido · precio y plazo confirmados antes de avanzar',
  'Mayorista para comercios · consultá condiciones',
  '¿Buscás algo especial? Preguntale a Fulano',
  'NOVEDADES · Deco, bazar y cosas útiles para la casa',
  'Fulano recomienda · medí dos veces y renegá ninguna',
  'PRÓXIMAMENTE · Nuevos productos y rubros en camino',
]

const heroTickerItems = [
  'Muebles a pedido',
  'Deco para tu casa',
  'Bazar',
  'Pedidos especiales',
  'Atención personalizada',
  'Textil y empresas',
  'Eventos y repostería',
  'Mayorista para comercios',
  'Un tipo que te da una mano',
]

function NewspaperTicker() {
  const loop = [...newspaperNotices, ...newspaperNotices]
  return <section className="newspaper-ticker newspaper-desk" aria-label="Ofertas y novedades de Fulano de Tal">
    <div className="paper-masthead"><span>EL DIARIO DE FULANO</span><b>Ofertas · novedades · datos útiles</b><em>Edición del día</em></div>
    <div className="ticker-track">{loop.map((notice, i) => <div className="ticker-notice" key={i}><span>{i%4===0?'OFERTA':i%4===1?'ÚLTIMO MOMENTO':i%4===2?'AVISO':'FULANO INFORMA'}</span><strong>{notice}</strong><b>✦</b></div>)}</div>
  </section>
}

const weeklyOffers = [
  { category: 'Muebles', title: 'La elegida de muebles', text: 'Cada semana este aviso trae un mueble elegido, con precio y condiciones bien claritas.', saying: '¡A la flauta! Cuando aparece una buena, hay que pispearla.' },
  { category: 'Deco, hogar y bazar', title: 'La elegida de deco', text: 'Cada semana reservamos este aviso para una oportunidad de deco, hogar o bazar.', saying: 'Más vale una cosita útil que diez juntando tierra.' },
  { category: 'Eventos y repostería', title: 'La elegida para la juntada', text: 'Acá va la oferta semanal de eventos o repostería cuando esté confirmada.', saying: 'El que avisa no traiciona… y el que compra con tiempo reniega menos.' },
  { category: 'Textil y empresas', title: 'La elegida de textil', text: 'Una propuesta semanal para equipos, empresas, eventos o trabajos especiales.', saying: 'Despacio y con buena letra, como decía la abuela.' },
  { category: 'Personalizados', title: 'El pedido especial de la semana', text: 'Una oportunidad distinta para regalar o resolver algo hecho especialmente.', saying: 'No hace falta inventar la pólvora; a veces el detalle hace todo.' },
]

const shopWorlds = [
  {
    id: 'deco-hogar-bazar',
    title: 'Deco, hogar y bazar',
    text: 'Objetos lindos y útiles para sumar a tu casa.',
    fulano: 'Chusmeá tranquilo. Una cosita acá, otra allá… y la casa cambia sin hacer un carnaval.',
    kicker: 'Para todos los días',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'eventos-reposteria',
    title: 'Eventos y repostería',
    text: 'Productos e insumos para cumpleaños, mesas dulces y ocasiones especiales.',
    fulano: 'Pispeá con tiempo, que para el cumple o la juntada es mejor que sobre una servilleta y no falte nada.',
    kicker: 'También mayorista',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'textil-empresas',
    title: 'Textil y empresas',
    text: 'Pedidos para equipos, eventos, empresas y trabajos textiles especiales.',
    fulano: 'Para el equipo, la empresa o la barra, lo charlamos y buscamos la vuelta. Cada pedido a su medida.',
    kicker: 'Para grupos y marcas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'personalizados',
    title: 'Personalizados',
    text: 'Regalos, tablas y detalles hechos especialmente para cada ocasión.',
    fulano: 'Si es para regalar, que tenga un poquito de historia. Si no, queda como mosquita muerta.',
    kicker: 'Hecho para vos',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  },
]

function Home({ navigate, openProduct }) {
  const [weeklyOfferIndex, setWeeklyOfferIndex] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setWeeklyOfferIndex(i => (i + 1) % weeklyOffers.length), 6500)
    return () => window.clearInterval(timer)
  }, [])
  const weeklyOffer = weeklyOffers[weeklyOfferIndex]
  return <main>
    <section className="hero hero-integrated"><NewspaperTicker/><div className="hero-mini-ticker" aria-label="Qué podés encontrar en Fulano de Tal"><div className="hero-mini-ticker-track">{[...heroTickerItems,...heroTickerItems].map((item,i)=><span className="hero-mini-ticker-item" key={i}>{item}<b>✦</b></span>)}</div></div><div className="hero-image hero-fulano-welcome"><img src="file_00000000da08820ea26b112407de4c25.png" alt="Fulano dando la bienvenida y presentando productos de la tienda"/><div className="hero-paper-ads" aria-label="Ofertas semanales de Fulano"><article className="paper-ad paper-ad-main paper-offer-rotator" key={weeklyOfferIndex}><div className="paper-ad-kicker"><span>¡OFERTA! · {weeklyOffer.category}</span><em>El Diario de Fulano</em></div><strong>{weeklyOffer.title}</strong><small>{weeklyOffer.text}</small><blockquote>“{weeklyOffer.saying}”</blockquote><div className="paper-offer-footer"><button type="button" onClick={() => navigate('catalog')}>Pispear las ofertas →</button><div className="paper-offer-dots" aria-label="Cambiar oferta">{weeklyOffers.map((offer,i)=><button type="button" key={offer.category} className={i===weeklyOfferIndex?'active':''} aria-label={`Ver oferta de ${offer.category}`} onClick={() => setWeeklyOfferIndex(i)}/>)}</div></div></article></div></div><section className="mobile-weekly-offers" aria-label="El Diario de Fulano, ofertas semanales"><div className="mobile-offer-head"><span>EL DIARIO DE FULANO</span><small>Una oferta de cada categoría · cada semana</small></div><article className="mobile-offer-card" key={`mobile-${weeklyOfferIndex}`}><div className="mobile-offer-label">¡OFERTA! · {weeklyOffer.category}</div><div className="mobile-offer-copy"><strong>{weeklyOffer.title}</strong><p>{weeklyOffer.text}</p><blockquote>“{weeklyOffer.saying}”</blockquote></div><div className="mobile-offer-bottom"><button type="button" onClick={() => navigate('catalog')}>Pispear →</button><div className="mobile-offer-dots" aria-label="Cambiar oferta">{weeklyOffers.map((offer,i)=><button type="button" key={offer.category} className={i===weeklyOfferIndex?'active':''} aria-label={`Ver oferta de ${offer.category}`} onClick={() => setWeeklyOfferIndex(i)}/>)}</div></div></article></section><div className="hero-copy"><div className="hero-tagline"><span>Fulano de Tal</span><strong>Un tipo que te da una mano.</strong></div><h1>Encontrá eso que <em>te viene haciendo falta.</em></h1><p>Te ayudamos a encontrar una buena opción para tu casa, tu negocio o tu proyecto, y coordinamos cada detalle con vos.</p><div className="hero-actions"><button className="primary" onClick={() => navigate('contact')}>Pedí tu presupuesto <ArrowRight size={18}/></button><button className="secondary hero-whatsapp" onClick={()=>openWhatsApp('Hola Fulano, quería hacer una consulta.')}><span className="button-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></span> Mandale un WhatsApp a Fulano</button></div><div className="hero-trust-strip"><span><b>Compra clara</b><small>Todo confirmado antes</small></span><span><b>Te acompañamos</b><small>Durante todo el proceso</small></span><span><b>Entrega coordinada</b><small>Sin sorpresas</small></span></div></div></section>

    <section className="section category-section"><div className="category-heading"><span className="eyebrow">Muebles por ambiente</span><h2>Elegí el espacio. Fulano te da una mano.</h2><p>Después vemos juntos opciones, medidas y entrega. Sin hacer un mundo de cada cosa.</p></div><div className="category-grid">{categories.map(c => <button className="category-card category-card-clean" key={c.name} onClick={() => c.catalog ? navigate('catalog', c.name) : navigate('contact')}><span className="category-image"><img src={c.image} alt={c.name}/></span><span className="category-copy"><strong>{c.name}</strong><small>{c.subtitle}</small><span className="fulano-says"><b>Fulano dice:</b><span>{c.fulano}</span></span><span className="category-cta"><em>{c.catalog ? 'Ver muebles' : 'Consultar'}</em><ArrowRight/></span></span></button>)}</div></section>

    <section className="section worlds-section"><SectionTitle eyebrow="Muebles y algo más" title="Fulano también anda en otras cosas" text="Casa, eventos, trabajo o un regalo especial. Si hay algo útil para resolver, lo charlamos."/><div className="world-grid">{shopWorlds.map((world,i)=><article className="world-card" key={world.title}><div className="world-image"><img src={world.image} alt={world.title}/><span>{world.kicker}</span></div><div className="world-body"><small>{String(i+1).padStart(2,'0')} · FULANO DE TAL</small><h3>{world.title}</h3><p className="world-summary">{world.text}</p><div className="world-fulano"><b>Fulano dice:</b><span>{world.fulano}</span></div><button className="text-button world-cta" onClick={() => navigate('world', world.id)}>Entrar <ArrowRight size={16}/></button></div></article>)}</div></section>

    <section className="coming-soon coming-soon-clean"><div className="coming-art"><img className="fulano-bike-image" src="fulano-bici.webp" alt="Fulano en bicicleta, saliendo a buscar nuevas ideas y productos"/></div><div className="coming-copy"><span className="eyebrow">PRÓXIMAMENTE</span><h2>Fulano agarró la bici y salió a investigar.</h2><p className="coming-lead">Hoy arrancamos por muebles y cosas útiles para la casa. Mañana, vaya uno a saber hasta dónde llega la bicicleta.</p><div className="coming-fulano"><b>Fulano dice:</b><span>“Si conocés algo que valga la pena, chiflame. Yo lo pispeo.”</span></div><button className="secondary" onClick={() => navigate('contact')}>Tengo una idea para Fulano</button></div></section>

    <section className="section products-section catalog-coming"><SectionTitle eyebrow="La vidriera de Fulano" title="Productos elegidos, con las cosas claras" text="Acá vas a encontrar muebles y otras cosas útiles con precio, medidas, plazo, entrega y condiciones bien explicadas."/><div className="catalog-coming-paper"><b>Fulano dice:</b><span>“Antes de llenar la vidriera por llenar, mejor poner cosas que valgan la pena. Despacio y con buena letra.”</span><button className="secondary" onClick={() => navigate('catalog')}>Recorrer categorías</button></div></section>

    <PaymentMethods />

    <section className="order-section"><div className="order-intro"><span className="eyebrow">Bajo pedido, bien acompañado</span><h2>Vos elegís.<br/>Fulano se mueve.</h2><p>Antes de confirmar, revisamos juntos disponibilidad, plazo, envío y forma de pago. Claro desde el principio.</p><button className="secondary light" onClick={() => navigate('how')}>Conocé cómo funciona</button></div><div className="order-steps">{[['01','Elegís','El producto y las variantes que mejor van con tu casa.'],['02','Confirmamos','Disponibilidad, precio, plazo y entrega. Sin sorpresas.'],['03','Lo pedimos','Hacemos el pedido especialmente para vos.'],['04','Te acompañamos','Te contamos cómo avanza hasta que llega a casa.']].map(s => <div className="order-step" key={s[0]}><span>{s[0]}</span><div><h3>{s[1]}</h3><p>{s[2]}</p></div></div>)}</div></section>

    <section className="section help-feature"><FulanoHelp scene="list" onContact={() => navigate('contact')}/></section>

    <section className="section trust"><SectionTitle eyebrow="Comprar con tranquilidad" title="Las cosas claras hacen una buena casa"/><div className="trust-grid">{[[ShieldCheck,'Todo confirmado antes','Precio, plazo y condiciones claras antes de avanzar.'],[MessageCircle,'Personas, no respuestas automáticas','Preguntá lo que necesites. Te responde alguien de verdad.'],[PackageCheck,'Seguimiento cercano','Te acompañamos desde el pedido hasta la entrega.'],[Ruler,'Medidas a la vista','Información simple para elegir sin adivinar.']].map(([Icon,t,d]) => <div key={t}><Icon/><h3>{t}</h3><p>{d}</p></div>)}</div><p className="trust-fulano"><b>Fulano dice:</b> “Primero las cosas claras. Después sí, ponemos la pava.”</p></section>

    <FAQ />
    <section className="contact-strip contact-strip-final"><div><span className="eyebrow">Antes de irte</span><h2>¿Te quedó algo dando vueltas?</h2><p>Mandame un mensaje y lo vemos tranquilo. Sin compromiso y sin vueltas raras.</p><button className="primary" onClick={() => navigate('contact')}><MessageCircle size={18}/> Hablar con Fulano</button></div><Fulano scene="phone"/></section>
  </main>
}

function PaymentMethods({ compact=false }) {
  const methods = [
    ['Transferencia', 'Se confirma el importe y los datos antes de pagar.'],
    ['Tarjetas', 'Crédito o débito cuando estén disponibles para ese pedido.'],
    ['Cuotas', 'Si hay cuotas o promociones, te informamos cantidad y costo final antes de confirmar.'],
  ]
  return <section className={compact?'payment-methods payment-compact':'section payment-methods'}>
    <div className="payment-heading"><span className="eyebrow">Medios de pago</span><h2>Con la plata no hacemos adivinanzas.</h2><p>Antes de confirmar el pedido te contamos el precio final, cómo podés pagarlo y si hay cuotas disponibles.</p></div>
    <div className="payment-grid">{methods.map(([title,text])=><article key={title}><strong>{title}</strong><p>{text}</p></article>)}</div>
    <small>Los medios, cuotas, promociones y eventuales recargos dependen de cada operación y se confirman antes de avanzar.</small>
  </section>
}

function FAQ() { const [open,setOpen]=useState(0); const items=[['¿Qué significa que un producto es bajo pedido?','Que lo encargamos especialmente después de confirmar con vos disponibilidad, precio, plazo y envío. No avanzamos sin que tengas toda la información.'],['¿Cuánto demora en llegar?','Depende del producto y del proveedor. En cada consulta te damos un plazo estimado antes de que confirmes.'],['¿Cómo se coordina el envío?','Revisamos tu ubicación y las características del mueble para informarte las opciones y el costo antes del pedido.'],['¿Puedo consultar antes de decidir?','Claro. La idea es que preguntes todo lo necesario, sin compromiso y con una persona real.']]; return <section className="section faq"><SectionTitle eyebrow="Preguntas frecuentes" title="Lo que suele andar dando vueltas"/><div>{items.map((x,i)=><button className={open===i?'open':''} key={x[0]} onClick={()=>setOpen(open===i?-1:i)}><span><strong>{x[0]}</strong><ChevronDown/></span>{open===i&&<p>{x[1]}</p>}</button>)}</div></section> }

function Worlds({ navigate }) {
  const allWorlds = [
    { id:'muebles', title:'Muebles', text:'Living, comedor, dormitorio, cocina, baño, oficina, guardado y a medida.', kicker:'El punto de partida', image:categories[0].image },
    ...shopWorlds,
  ]
  return <main className="worlds-page"><section className="page-heading"><span className="eyebrow">Muebles y algo más</span><h1>¿Qué andás buscando?</h1><p>Entrá por categoría. Fulano ordenó la vidriera para que encuentres más fácil por dónde empezar.</p></section><section className="section worlds-hub-grid">{allWorlds.map(w=><button className="world-hub-card" key={w.id} onClick={()=>navigate('world',w.id)}><span className="world-hub-image"><img src={w.image} alt={w.title}/><small>{w.kicker}</small></span><span className="world-hub-copy"><strong>{w.title}</strong><span>{w.text}</span><em>Entrar <ArrowRight size={16}/></em></span></button>)}</section></main>
}

function WorldPage({ worldId, navigate }) {
  const furniture = worldId === 'muebles'
  const world = furniture ? { title:'Muebles', text:'Living, comedor, dormitorio, cocina, baño, oficina, guardado y trabajos a medida.', fulano:'Elegí por dónde arrancar. Si no sabés el nombre, contame qué necesitás y le buscamos la vuelta.' } : shopWorlds.find(w => w.id === worldId)
  if (!world) return null
  return <main className="world-page">
    <section className="page-heading world-page-heading"><span className="eyebrow">Muebles y algo más</span><h1>{world.title}</h1><p>{world.text}</p><div className="catalog-fulano"><b>Fulano dice:</b><span>{world.fulano}</span></div></section>
    {furniture ? <section className="section world-category-list"><div className="category-grid">{categories.map(c=><button className="category-card category-card-clean" key={c.name} onClick={()=>c.catalog?navigate('catalog',c.name):navigate('contact')}><span className="category-image"><img src={c.image} alt={c.name}/></span><span className="category-copy"><strong>{c.name}</strong><small>{c.subtitle}</small><span className="category-cta"><em>{c.catalog?'Ver categoría':'Consultar'}</em><ArrowRight/></span></span></button>)}</div></section> :
    <section className="section world-empty"><div className="world-empty-paper"><span className="eyebrow">La vidriera de Fulano</span><h2>Acá vas a encontrar {world.title.toLowerCase()}.</h2><p>Vamos sumando productos con información clara y confirmada. Si ya estás buscando algo puntual, no hace falta esperar a verlo publicado.</p><div className="world-empty-fulano"><b>Fulano dice:</b><span>“No lo viste en la vidriera no quiere decir que no exista. Chiflame y lo pispeamos.”</span></div><button className="primary" onClick={()=>navigate('contact')}><span className="button-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></span> Preguntale a Fulano</button></div></section>}
  </main>
}

function Catalog({ category, openProduct, navigate }) {
  const [query,setQuery]=useState('')
  const [active,setActive]=useState(category||'Todos')
  const [world,setWorld]=useState('Todos')
  const [fulfillment,setFulfillment]=useState('Todos')
  const [sort,setSort]=useState('featured')
  const previewCategories=['Living','Comedor','Dormitorio','Cocina','Baño','Oficina','Guardado','A medida']
  const categories=['Todos',...new Set(products.length?products.map(p=>p.category).filter(Boolean):previewCategories)]
  const worlds=['Todos',...new Set(products.length?products.map(p=>p.world).filter(Boolean):catalogWorlds.map(w=>w.id))]
  const previewMode=products.length===0
  const shown=useMemo(()=>{
    const q=query.trim().toLowerCase()
    const list=products.filter(p=>{
      const haystack=[p.name,p.category,p.world,p.description,p.material,p.supplierCode,...(p.colors||[])].filter(Boolean).join(' ').toLowerCase()
      return (active==='Todos'||p.category===active)&&(world==='Todos'||p.world===world)&&(fulfillment==='Todos'||(fulfillment==='stock'?p.fulfillment==='stock':p.fulfillment!=='stock'))&&(!q||haystack.includes(q))
    })
    return [...list].sort((a,b)=>{
      if(sort==='price-asc') return (a.price??Infinity)-(b.price??Infinity)
      if(sort==='price-desc') return (b.price??-1)-(a.price??-1)
      if(sort==='name') return a.name.localeCompare(b.name,'es')
      return Number(b.featured)-Number(a.featured)
    })
  },[active,world,fulfillment,sort,query])
  const filtersOn=query||active!=='Todos'||world!=='Todos'||fulfillment!=='Todos'||sort!=='featured'
  const clear=()=>{setQuery('');setActive('Todos');setWorld('Todos');setFulfillment('Todos');setSort('featured')}
  return <main className="catalog-page">
    <section className="page-heading catalog-heading"><span className="eyebrow">La vidriera de Fulano</span><h1>¿Qué andás buscando?</h1><p>Buscá por nombre, ambiente, material, color o código. Después afiná con los filtros.</p><div className="catalog-fulano"><b>Fulano dice:</b><span>Pispeá tranquilo. Si no aparece, preguntame; capaz está pero se hizo el distraído.</span></div></section>
    <section className="catalog-controls catalog-controls-pro">
      {previewMode&&<div className="filters-preview-note"><b>Vista previa del catálogo</b><span>Estos filtros ya están preparados. Se activarán con los productos reales que vayamos cargando.</span></div>}
      <label className="catalog-search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ej.: mesa, placard, madera, negro…"/>{query&&<button aria-label="Borrar búsqueda" onClick={()=>setQuery('')}>×</button>}</label>
      <div className="catalog-toolbar">
        <div className="catalog-meta"><strong>{shown.length}</strong> {shown.length===1?'producto':'productos'} encontrados</div>
        <label className="catalog-sort">Ordenar <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Destacados</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">A–Z</option></select></label>
      </div>
      {worlds.length>1&&<div className="filter-block"><small>Universo</small><div className="filters">{worlds.map(x=><button className={world===x?'active':''} onClick={()=>!previewMode&&setWorld(x)} disabled={previewMode} key={x}>{x==='Todos'?'Todo':catalogWorlds.find(w=>w.id===x)?.name||x}</button>)}</div></div>}
      {categories.length>1&&<div className="filter-block"><small>Categoría</small><div className="filters">{categories.map(x=><button className={active===x?'active':''} onClick={()=>!previewMode&&setActive(x)} disabled={previewMode} key={x}>{x}</button>)}</div></div>}
      <div className="filter-block"><small>Modalidad</small><div className="filters"><button className={fulfillment==='Todos'?'active':''} onClick={()=>!previewMode&&setFulfillment('Todos')} disabled={previewMode}>Todas</button><button className={fulfillment==='order'?'active':''} onClick={()=>!previewMode&&setFulfillment('order')} disabled={previewMode}>Bajo pedido</button><button className={fulfillment==='stock'?'active':''} onClick={()=>!previewMode&&setFulfillment('stock')} disabled={previewMode}>Stock propio</button></div></div>
      {filtersOn&&<button className="clear-filters" onClick={clear}>Limpiar filtros</button>}
    </section>
    {shown.length?<div className="section product-grid catalog-grid">{shown.map(p=><ProductCard key={p.id} product={p} onOpen={openProduct}/>)}</div>:<div className="empty catalog-empty"><Fulano scene="search"/><h2>{filtersOn?'No encontré nada con esos filtros.':'Fulano está buscando buenas cosas para mostrarte.'}</h2><p>{filtersOn?'Probá limpiando algún filtro o contanos qué necesitás y le buscamos la vuelta.':'La vidriera se va llenando solamente con productos que tengan información clara y confirmada.'}</p>{filtersOn&&<button className="secondary" onClick={clear}>Limpiar búsqueda y filtros</button>}</div>}
    <section className="catalog-help"><div><span className="eyebrow">¿No encontraste lo que buscabas?</span><h2>No quiere decir que no lo podamos conseguir.</h2><p>Contanos qué necesitás, las medidas que tenés o mandanos una referencia. Fulano busca la vuelta.</p></div><button className="primary" onClick={()=>navigate('contact')}><span className="button-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></span> Preguntale a Fulano</button></section>
  </main>
}

function ProductDetail({ product, navigate, addToCart }) {
  const gallery=[product.image,...(product.gallery||[])].filter(Boolean)
  const [activeImage,setActiveImage]=useState(gallery[0]||'')
  const [color,setColor]=useState(product.colors?.[0] || '')
  const isStock=product.fulfillment==='stock'
  const hasOffer=product.previousPrice&&product.price&&product.previousPrice>product.price
  return <main className="detail-page product-page-pro">
    <button className="back" onClick={()=>navigate('catalog')}><ArrowLeft/> Volver al catálogo</button>
    <section className="product-detail product-detail-pro">
      <div className="product-gallery">
        <div className="detail-image detail-image-main">{activeImage?<img src={activeImage} alt={product.name}/>:<div className="image-placeholder">Imagen a confirmar</div>}<span className={isStock?'tag tag-stock':'tag'}>{isStock?'Entrega disponible':'Bajo pedido'}</span>{hasOffer&&<span className="offer-badge">{product.offerLabel||'OFERTA'}</span>}</div>
        {gallery.length>1&&<div className="product-thumbs">{gallery.map((img,i)=><button key={img+i} className={activeImage===img?'active':''} onClick={()=>setActiveImage(img)}><img src={img} alt=""/></button>)}</div>}
      </div>
      <div className="detail-copy detail-buybox">
        <div className="product-meta-top"><span className="eyebrow">{product.category||product.world}</span>{product.supplierCode&&<small>Cód. {product.supplierCode}</small>}</div>
        <h1>{product.name}</h1>
        {hasOffer&&<p className="previous-price">{formatPrice(product.previousPrice)}</p>}
        <p className="detail-price">{formatPrice(product.price)}</p>
        <p className="detail-price-note">{product.price==null?'Consultanos y confirmamos el valor antes de avanzar.':'Precio sujeto a confirmación al momento del pedido.'}</p>
        {product.payment&&<div className="product-payment-highlight">{product.payment}</div>}
        <p className="lead">{product.description}</p>
        {product.fulano&&<div className="detail-fulano"><b>Fulano dice:</b><span>{product.fulano}</span></div>}
        {(product.colors||[]).length>0&&<div className="choice"><strong>Terminación / color: {color}</strong><div>{product.colors.map(x=><button className={color===x?'active':''} key={x} onClick={()=>setColor(x)}>{x}</button>)}</div></div>}
        <div className="product-facts">
          {product.dimensions&&<div><Ruler/><span><b>Medidas</b>{product.dimensions}</span></div>}
          {product.material&&<div><PackageCheck/><span><b>Material</b>{product.material}</span></div>}
          <div><Truck/><span><b>Entrega</b>{product.shipping||'Se cotiza y coordina según tu localidad.'}</span></div>
          <div><ShieldCheck/><span><b>{isStock?'Disponibilidad':'Pedido'}</b>{isStock?'Confirmamos disponibilidad antes de coordinar la entrega.':product.leadTime?'Plazo estimado: '+product.leadTime:'Confirmamos disponibilidad y plazo antes de avanzar.'}</span></div>
        </div>
        <div className="detail-order-note"><strong>{isStock?'¿Cómo seguimos?':'Primero las cosas claras.'}</strong><span>{isStock?'Confirmamos que siga disponible, el pago y la entrega.':'Confirmamos precio, plazo, forma de pago y entrega. Recién después encargamos tu pedido.'}</span></div>
        <div className="product-actions"><button className="primary cart-add-main" onClick={()=>addToCart(product,color)}><ShoppingCart/> Al changuito</button><button className="secondary" onClick={()=>openWhatsApp('Hola Fulano, quiero consultar por '+product.name+(color?' — '+color:'')+'.')}><span className="button-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></span> Preguntale a Fulano</button></div>
        <PaymentMethods compact/>
        <small className="demo-notice">Precio, disponibilidad, plazo y condiciones se confirman antes de realizar el pedido.</small>
      </div>
    </section>
    <section className="section product-extra-info"><article><span className="eyebrow">Antes de pedir</span><h2>Medí dos veces. Renegá ninguna.</h2><p>{product.dimensions?<>Este producto mide <strong>{product.dimensions}</strong>. </>:null}Revisá también puertas, pasillos, escaleras o ascensor. Si te queda justo, preguntale a Fulano antes de hacer macanas.</p><button className="secondary" onClick={()=>navigate('contact')}>Necesito ayuda para medir</button></article><article><span className="eyebrow">Compra acompañada</span><h2>No te dejamos adivinando.</h2><p>Antes de confirmar te contamos qué hay disponible, cuánto sale, cuánto demora y cómo llega. Sin sorpresas después.</p></article></section>
  </main>
}

function How({ navigate }) { const steps=[['1','Elegís y consultás','Chusmeá el catálogo o contanos qué necesitás. Revisamos producto, medidas, variantes y cualquier duda antes de hablar de plata.'],['2','Dejamos todo claro','Te confirmamos precio, disponibilidad, plazo estimado, forma de pago y cómo sería la entrega. Sin letra chica ni adivinanzas.'],['3','Confirmás el pedido','Si estás de acuerdo, coordinamos la seña o el pago que corresponda. Recién ahí encargamos el producto especialmente para vos.'],['4','Fulano te mantiene al tanto','Seguimos el pedido y te avisamos las novedades. Si surge un cambio importante, lo hablamos antes de avanzar.'],['5','Saldo y entrega','Antes del despacho o retiro coordinamos el saldo pendiente, cuando corresponda, y dejamos definida la entrega.'],['6','Listo, a disfrutarlo','Recibís tu pedido. Si necesitás una mano con alguna consulta posterior, seguimos del otro lado.']]; return <main className="how-page"><section className="page-heading illustrated how-heading"><div><span className="eyebrow">Cómo comprar</span><h1>Primero las cosas claras.<br/>Después ponemos la pava.</h1><p>Comprar bajo pedido es simple cuando sabés qué pasa en cada momento. Acá te contamos el recorrido completo, sin vueltas raras.</p><div className="how-fulano"><b>Fulano dice:</b><span>Con la plata no hacemos adivinanzas. Primero dejamos todo claro y después avanzamos.</span></div></div><Fulano scene="list"/></section><section className="section how-steps how-steps-trust">{steps.map(x=><article key={x[0]}><span>{x[0]}</span><div><h2>{x[1]}</h2><p>{x[2]}</p></div></article>)}</section><section className="section before-paying"><span className="eyebrow">Antes de poner un peso</span><h2>Esto tiene que estar confirmado.</h2><div className="before-paying-grid">{[['Producto','Modelo, variante, color o terminación elegida.'],['Precio','Valor confirmado y qué incluye.'],['Plazo','Tiempo estimado informado antes de encargar.'],['Pago','Seña, saldo y medios disponibles según el pedido.'],['Entrega','Modalidad, localidad y costo cuando corresponda.'],['Contacto','Un canal para seguir tu pedido y consultar.']].map(x=><div key={x[0]}><ShieldCheck/><strong>{x[0]}</strong><p>{x[1]}</p></div>)}</div></section><section className="section process-note process-note-trust"><Fulano scene="box"/><div><span className="eyebrow">Compra acompañada</span><h2>Bajo pedido no significa a ciegas.</h2><p>No encargamos nada hasta que conozcas las condiciones del pedido y nos des tu confirmación. Y durante el proceso, seguimos en contacto con vos.</p><button className="primary" onClick={()=>navigate('catalog')}>Chusmear el catálogo</button><button className="text-button process-contact" onClick={()=>navigate('contact')}>Tengo una duda →</button></div></section><PaymentMethods/><FAQ/></main> }

function Legal({ section='terms', navigate }) {
  const sections = {
    terms: {
      eyebrow: 'Información legal',
      title: 'Términos de compra',
      body: <>
        <p>Fulano de Tal trabaja principalmente bajo pedido. Antes de confirmar una compra se informa precio, disponibilidad, plazo estimado, forma de pago y modalidad de entrega aplicable.</p>
        <p>Las condiciones particulares de cada operación se confirman antes de avanzar. Los derechos reconocidos por la normativa de defensa del consumidor no se consideran renunciados por estas condiciones.</p>
        <p className="legal-placeholder"><strong>Antes de publicar:</strong> completar nombre o razón social del vendedor, CUIT, domicilio comercial/fiscal y canales formales de contacto.</p>
      </>
    },
    returns: {
      eyebrow: 'Información legal',
      title: 'Cambios y devoluciones',
      body: <>
        <p>Los cambios, devoluciones y garantías se gestionan según el tipo de producto, su estado, las condiciones informadas en la compra y la normativa aplicable.</p>
        <p>Los productos confeccionados conforme a especificaciones del cliente o claramente personalizados pueden quedar exceptuados del derecho de revocación cuando corresponda legalmente.</p>
        <p>Si un producto llega con un inconveniente, escribinos para registrar el caso y coordinar los pasos a seguir.</p>
      </>
    },
    privacy: {
      eyebrow: 'Información legal',
      title: 'Privacidad',
      body: <>
        <p>Los datos que compartas para realizar una consulta o compra se utilizan para responderte, preparar presupuestos, coordinar pedidos, pagos y entregas, y brindar atención vinculada a la operación.</p>
        <p>No publicamos ni vendemos tus datos personales. Antes de habilitar formularios, pagos o herramientas de analítica, esta política deberá completarse con los proveedores utilizados y los canales para ejercer derechos sobre los datos.</p>
      </>
    },
    withdrawal: {
      eyebrow: 'Compras a distancia',
      title: 'Botón de arrepentimiento',
      body: <>
        <p>Si realizaste una compra online y el derecho de revocación resulta aplicable, podés solicitar el arrepentimiento dentro del plazo legal correspondiente.</p>
        <p>No hace falta registrarte ni realizar trámites adicionales para iniciar la solicitud. Los productos hechos conforme a tus especificaciones o claramente personalizados pueden encontrarse dentro de las excepciones legales.</p>
        <button className="primary legal-action" onClick={() => navigate('contact')}>Solicitar arrepentimiento</button>
        <p className="legal-note">Este acceso inicia el contacto. Antes de lanzar la tienda deberá vincularse a un canal que genere y conserve constancia de la solicitud.</p>
      </>
    }
  }
  const current = sections[section] || sections.terms
  return <main className="legal-page">
    <section className="page-heading">
      <span className="eyebrow">{current.eyebrow}</span>
      <h1>{current.title}</h1>
      <p>Información clara, sin letra chica.</p>
    </section>
    <section className="section legal-content">{current.body}</section>
  </main>
}

function Cart({ cart, setCart, navigate }) {
  const count=cart.reduce((n,i)=>n+i.qty,0)
  const keyOf=i=>`${i.id}::${i.variant||''}`
  const change=(key,d)=>setCart(items=>items.map(i=>keyOf(i)===key?{...i,qty:Math.max(1,i.qty+d)}:i))
  const remove=key=>setCart(items=>items.filter(i=>keyOf(i)!==key))
  const consultation=()=>{ const lines=cart.map(i=>`• ${i.qty} x ${i.name}${i.variant?` — ${i.variant}`:''} — ${formatPrice(i.price)}`); return ['Hola Fulano, quiero consultar por este changuito:','',...lines,'','¿Me confirmás disponibilidad, precio final, plazo y entrega?'].join('\n') }
  return <main className="cart-page"><section className="page-heading"><span className="eyebrow">El changuito de Fulano</span><h1>{count?'A ver qué anduviste pispeando…':'¡A la flauta! Acá no hay nada todavía.'}</h1><p>{count?'Guardá acá lo que te interesa. Antes de pagar, Fulano confirma disponibilidad, precio final, plazo y entrega.':'Pegate una vuelta por la vidriera y meté algo lindo al changuito.'}</p></section>{count?<section className="section cart-sheet"><div className="cart-list">{cart.map(i=>{const key=keyOf(i);return <article className="cart-item" key={key}>{i.image&&<img className="cart-item-image" src={i.image} alt=""/>}<div className="cart-item-copy"><strong>{i.name}</strong>{i.variant&&<span>{i.variant}</span>}<small>{formatPrice(i.price)}</small><em>{i.fulfillment==='stock'?'Stock propio':'Bajo pedido'}</em></div><div className="cart-qty"><button onClick={()=>change(key,-1)}>−</button><b>{i.qty}</b><button onClick={()=>change(key,1)}>+</button></div><button className="cart-remove" onClick={()=>remove(key)}>Quitar</button></article>})}</div><aside className="cart-summary"><h2>Primero las cosas claras.</h2><p>El changuito guarda tu selección. No genera un cobro automático: confirmamos cada condición con vos antes del pedido.</p><div className="cart-consultation"><small>Tu consulta queda preparada así:</small><pre>{consultation()}</pre></div><button className="primary" onClick={()=>openWhatsApp(consultation())}>Consultar mi changuito</button><button className="secondary" onClick={()=>navigate('worlds')}>Seguir pispeando</button></aside></section>:<section className="section cart-empty"><button className="primary" onClick={()=>navigate('worlds')}>Ir a productos</button></section>}</main>
}

function About({ contact=false, navigate, contactDraft='' }) { if(contact) return <main className="contact-page"><section className="page-heading illustrated contact-heading"><div><span className="eyebrow">Contacto</span><h1>Fulano está del otro lado.</h1><p>Contanos qué estás buscando y te damos una mano. Para presupuestar bien, cuanto más claro venga el mensaje, menos vueltas damos después.</p><div className="contact-fulano"><b>Fulano dice:</b><span>No hace falta escribir una novela. Con qué buscás, medidas aproximadas y tu localidad ya arrancamos bastante bien.</span></div></div><Fulano scene="phone"/></section><section className="section contact-guide">{contactDraft&&<div className="contact-draft"><span className="eyebrow">Tu changuito</span><h2>Consulta preparada</h2><pre>{contactDraft}</pre><p>Este texto queda listo para usar cuando conectemos el canal de contacto definitivo.</p></div>}<div><span className="eyebrow">Para ayudarte mejor</span><h2>Mandanos estas cuatro cosas.</h2><p>Así podemos consultar disponibilidad, precio y entrega con información concreta.</p></div><div className="contact-guide-grid">{[['1','Qué estás buscando','Nombre del producto, una foto o una referencia sirve.'],['2','Medidas','Del mueble que necesitás o del espacio disponible.'],['3','Tu localidad','Para revisar opciones y costo de entrega.'],['4','Algún detalle importante','Color, terminación, cantidad o fecha que necesites.']].map(x=><article key={x[0]}><span>{x[0]}</span><div><strong>{x[1]}</strong><p>{x[2]}</p></div></article>)}</div><div className="contact-channel"><div><strong>Contacto directo</strong><p>Mientras terminamos de definir el canal principal, podés dejarnos tu consulta desde los accesos de la página.</p></div><button className="primary" onClick={()=>openWhatsApp(contactDraft || "Hola Fulano, quería hacer una consulta.")}><span className="button-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.1.55 4.16 1.6 5.97L3.5 28.66l7.97-2.08a12.08 12.08 0 0 0 4.57.89h.01c6.61 0 12-5.35 12-11.93C28.05 8.96 22.66 3 16.04 3Zm.56 22.45c-1.38 0-2.74-.37-3.93-1.06l-.28-.17-4.73 1.24 1.26-4.59-.18-.29a9.84 9.84 0 0 1-1.52-5.25c0-5.43 4.46-9.85 9.94-9.85 5.47 0 9.92 4.42 9.92 9.85 0 5.44-4.45 10.12-9.92 10.12h-.56Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.85 1.22 3.05c.15.2 2.1 3.18 5.08 4.46.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg></span> Preguntale a Fulano</button><a className="secondary contact-email" href={`mailto:${CONTACT_EMAIL}`}>Escribir por email</a></div></section></main>;  return <main className="about-page"><section className="page-heading illustrated about-heading about-heading-brand"><div><span className="eyebrow">Quiénes somos</span><h1>Un nombre cualquiera.<br/>Una atención nada cualquiera.</h1><p>Fulano de Tal es una tienda pensada para ayudarte a encontrar muebles y otras cosas útiles sin comprar a las apuradas ni a ciegas.</p><div className="about-fulano"><b>Fulano dice:</b><span>Yo no tengo todas las respuestas. Pero si no la sé, la averiguo. Chamuyar es más fácil; ayudar sirve más.</span></div></div><Fulano scene="hello"/></section><section className="section about-story"><div><span className="eyebrow">La idea</span><h2>Vender está bien. Dar una mano, mejor.</h2></div><div><p>La idea de Fulano es bastante sencilla: escuchar qué necesitás, buscar una opción que tenga sentido y explicarte con claridad cómo sería la compra antes de que decidas.</p><p>Arrancamos con muebles bajo pedido y la intención es sumar, de a poco, deco, bazar, textil, eventos, personalizados y esas cosas que a veces uno necesita y no sabe bien dónde buscar.</p><p><strong>No queremos venderte cualquier cosa.</strong> Queremos que sepas qué estás comprando, cuánto cuesta, cuánto puede demorar y cómo llega.</p></div></section><section className="section about-values"><span className="eyebrow">La forma de Fulano</span><h2>Hay cosas que no deberían pasar de moda.</h2><div className="about-values-grid">{[['Hablar claro','Precio, plazo, pago y entrega se explican antes de avanzar.'],['Atender personas','Del otro lado hay una consulta real, no solamente un número de pedido.'],['Buscar la vuelta','Si no está en catálogo, podemos averiguar si existe una opción que sirva.'],['No prometer de más','Preferimos confirmar antes que decir que sí porque queda lindo.']].map(x=><article key={x[0]}><ShieldCheck/><strong>{x[0]}</strong><p>{x[1]}</p></article>)}</div></section><section className="section about-order"><div><span className="eyebrow">¿Por qué bajo pedido?</span><h2>Porque primero tiene que existir una necesidad, no una caja juntando polvo.</h2><p>Trabajamos principalmente bajo pedido: primero vemos qué necesitás y confirmamos las condiciones. Recién con tu decisión avanzamos con el encargo. Eso nos permite ofrecer más opciones sin llenar un depósito de productos elegidos a las apuradas.</p><button className="secondary" onClick={()=>navigate('how')}>Ver cómo comprar</button></div><Fulano scene="box"/></section><section className="contact-strip about-contact"><div><span className="eyebrow">Y si no sabés por dónde empezar…</span><h2>Preguntale a Fulano.</h2><p>Contanos qué necesitás. Sin presión para comprar y sin hacerte sentir que tenías que venir con todo resuelto.</p><button className="primary" onClick={()=>navigate('contact')}><MessageCircle/> Contactar a Fulano</button></div><Fulano scene="phone"/></section></main> }

export default function App(){ const [page,setPage]=useState('home'); const [cart,setCart]=useState([]); const [category,setCategory]=useState(''); const [legalSection,setLegalSection]=useState('terms'); const [product,setProduct]=useState(null); const [contactDraft,setContactDraft]=useState(''); const navigate=(next,data)=>{setPage(next); if(next==='catalog'||next==='world')setCategory(data||''); if(next==='legal')setLegalSection(data||'terms'); if(next==='contact')setContactDraft(typeof data==='string'?data:''); setProduct(null); window.scrollTo(0,0)}; const openProduct=p=>{setProduct(p);setPage('product');window.scrollTo(0,0)}; const addToCart=(p,variant='')=>setCart(items=>{const key=`${p.id}::${variant}`;const found=items.find(i=>`${i.id}::${i.variant||''}`===key);return found?items.map(i=>`${i.id}::${i.variant||''}`===key?{...i,qty:i.qty+1}:i):[...items,{...p,variant,fulfillment:p.fulfillment||'order',qty:1}]}); useEffect(()=>{const onPop=()=>navigate('home');window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]); return <><Header navigate={navigate} onSearch={()=>navigate('catalog')} cartCount={cart.reduce((n,i)=>n+i.qty,0)}/>{page==='home'&&<Home navigate={navigate} openProduct={openProduct}/>} {page==='catalog'&&<Catalog category={category} openProduct={openProduct} navigate={navigate}/>} {page==='cart'&&<Cart cart={cart} setCart={setCart} navigate={navigate}/>} {page==='worlds'&&<Worlds navigate={navigate}/>} {page==='world'&&<WorldPage worldId={category} navigate={navigate}/>} {page==='product'&&product&&<ProductDetail product={product} navigate={navigate} addToCart={addToCart}/>} {page==='how'&&<How navigate={navigate}/>} {page==='about'&&<About navigate={navigate}/>} {page==='contact'&&<About contact navigate={navigate} contactDraft={contactDraft}/>} {page==='legal'&&<Legal section={legalSection} navigate={navigate}/>}<Footer navigate={navigate}/><button className="whatsapp-float" onClick={()=>openWhatsApp('Hola Fulano, quería hacer una consulta.')} aria-label="Mandale un WhatsApp a Fulano" title="Mandale un WhatsApp a Fulano"><strong className="whatsapp-text-icon" aria-hidden="true">◉</strong><span className="whatsapp-label">Mandale un WhatsApp a Fulano</span></button></> }

