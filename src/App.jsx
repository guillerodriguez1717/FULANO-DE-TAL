import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, PackageCheck, Ruler, Search, ShieldCheck, Truck } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import FulanoHelp from './components/FulanoHelp'
import Fulano from './components/Fulano'
import { BrandSeal } from './components/Logo'
import { categories, formatPrice, products } from './data/products'

const WHATSAPP_NUMBER = '' // Configurar el número real con código de país, solo dígitos.
const openWhatsApp = (message) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')

function SectionTitle({ eyebrow, title, text, action }) { return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div> }

const newspaperNotices = [
  'Envíos a todo el país · a cargo del cliente',
  'Muebles a pedido',
  'Atención personalizada',
  'Ofertas por pedido',
  '¿Buscás algo especial? Preguntale a Fulano',
  'Próximamente · Fulano agarró la bici y salió a investigar',
]

function NewspaperTicker() {
  const loop = [...newspaperNotices, ...newspaperNotices]
  return <section className="newspaper-ticker" aria-label="Novedades de Fulano de Tal"><div className="ticker-track">{loop.map((notice, i) => <div className="ticker-notice" key={i}><span>EDICIÓN ESPECIAL</span><strong>{notice}</strong><b>✦</b></div>)}</div></section>
}

const shopWorlds = [
  {
    title: 'Deco, hogar y bazar',
    text: 'Objetos útiles, lindos y fáciles de sumar a la casa.',
    kicker: 'Para todos los días',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Eventos y repostería',
    text: 'Descartables, cotillón, harinas, frutos secos, dulce de leche e insumos para cumpleaños.',
    kicker: 'También mayorista',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Textil y empresas',
    text: 'Remeras para eventos, maratones, empresas y trabajos textiles especiales.',
    kicker: 'Para grupos y marcas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Personalizados',
    text: 'Tablas, regalos y pedidos especiales hechos para cada ocasión.',
    kicker: 'Hecho para vos',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  },
]

function Home({ navigate, openProduct }) {
  return <main>
    <section className="hero"><div className="hero-copy"><div className="hero-brand"><span className="eyebrow">FULANO DE TAL</span><span className="hero-descriptor">Muebles y algo más</span></div><h1>Encontrá eso que <em>te viene haciendo falta.</em></h1><p>Muebles, deco, bazar y pedidos especiales. Te ayudamos a encontrar una buena opción y coordinamos cada detalle con vos.</p><div className="hero-actions"><button className="primary" onClick={() => navigate('contact')}>Pedí tu presupuesto <ArrowRight size={18}/></button><button className="secondary" onClick={() => navigate('contact')}><MessageCircle size={18}/> Hablá con Fulano</button></div><div className="hero-note"><span>Compra segura</span><span>Acompañamiento en todo el proceso</span><span>Entrega coordinada</span></div></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90" alt="Living cálido con muebles contemporáneos"/><div className="hero-brand-seal"><BrandSeal/><span>Fulano te da<br/><strong>una mano</strong></span></div></div></section>

    <NewspaperTicker />

    <section className="section category-section"><div className="category-heading"><span className="eyebrow">Muebles por ambiente</span><h2>Entrá por donde empieza tu casa.</h2><p>Living, dormitorio, cocina, baño, oficina y más. Elegí el ambiente y después vemos juntos medidas, opciones y tiempos.</p></div><div className="category-grid">{categories.map(c => <button className="category-card" key={c.name} onClick={() => c.catalog ? navigate('catalog', c.name) : navigate('contact')}><img src={c.image} alt={c.name}/><span className="category-copy"><small>{c.subtitle}</small><strong>{c.name}</strong><em>{c.catalog ? 'Ver muebles' : 'Consultar'}</em><ArrowRight/></span></button>)}</div></section>

    <section className="section worlds-section"><SectionTitle eyebrow="Muebles y algo más" title="Todo lo que puede aparecer por lo de Fulano" text="Cada rubro tiene su lugar, su estilo y su forma de compra. Así podés recorrer sin que parezca que vendemos cualquier cosa mezclada."/><div className="world-grid">{shopWorlds.map((world,i)=><article className="world-card" key={world.title}><div className="world-image"><img src={world.image} alt={world.title}/><span>{world.kicker}</span></div><div className="world-body"><small>{String(i+1).padStart(2,'0')} · FULANO DE TAL</small><h3>{world.title}</h3><p>{world.text}</p><button className="text-button" onClick={() => navigate('contact')}>Consultar <ArrowRight size={16}/></button></div></article>)}</div></section>

    <section className="coming-soon"><div className="coming-copy"><span className="eyebrow">PRÓXIMAMENTE</span><h2>Fulano agarró la bici y salió a investigar.</h2><p>Anda recorriendo, preguntando y juntando ideas para sumar nuevas cosas a la tienda. Si tenés una sugerencia, una propuesta o algo para ofrecer, Fulano quiere escucharte.</p><button className="secondary" onClick={() => navigate('contact')}>Tengo una idea para Fulano</button><small className="coming-note">Podés sugerir un producto, acercar una propuesta o recomendarnos algo para sumar.</small></div><div className="coming-art"><img className="fulano-bike-image" src="fulano-bici.webp" alt="Fulano en bicicleta, saliendo a buscar nuevas ideas y productos"/></div></section>

    <section className="section products-section"><SectionTitle eyebrow="Los más mirados" title="Favoritos de la casa" action={<button className="text-button" onClick={() => navigate('catalog')}>Ver todos los muebles →</button>}/><div className="product-grid">{products.filter(p => p.featured).map(p => <ProductCard key={p.id} product={p} onOpen={openProduct}/>)}</div></section>

    <section className="order-section"><div className="order-intro"><span className="eyebrow">Bajo pedido, bien acompañado</span><h2>Vos elegís.<br/>Fulano se mueve.</h2><p>Antes de confirmar, revisamos juntos disponibilidad, plazo, envío y forma de pago. Claro desde el principio.</p><button className="secondary light" onClick={() => navigate('how')}>Conocé cómo funciona</button></div><div className="order-steps">{[['01','Elegís','El producto y las variantes que mejor van con tu casa.'],['02','Confirmamos','Disponibilidad, precio, plazo y entrega. Sin sorpresas.'],['03','Lo pedimos','Hacemos el pedido especialmente para vos.'],['04','Te acompañamos','Te contamos cómo avanza hasta que llega a casa.']].map(s => <div className="order-step" key={s[0]}><span>{s[0]}</span><div><h3>{s[1]}</h3><p>{s[2]}</p></div></div>)}</div></section>

    <section className="section help-feature"><FulanoHelp scene="list" title="Preguntale a Fulano" text="Contanos qué necesitás. Te acompañamos con medidas, opciones, tiempos y entrega para que compres tranquilo." questions={['Quiero un mueble a medida', 'Busco opciones', 'Necesito asesoramiento']}/></section>

    <section className="section trust"><SectionTitle eyebrow="Comprar con tranquilidad" title="Las cosas claras hacen una buena casa"/><div className="trust-grid">{[[ShieldCheck,'Todo confirmado antes','Precio, plazo y condiciones claras antes de avanzar.'],[MessageCircle,'Personas, no respuestas automáticas','Preguntá lo que necesites. Te responde alguien de verdad.'],[PackageCheck,'Seguimiento cercano','Te acompañamos desde el pedido hasta la entrega.'],[Ruler,'Medidas a la vista','Información simple para elegir sin adivinar.']].map(([Icon,t,d]) => <div key={t}><Icon/><h3>{t}</h3><p>{d}</p></div>)}</div></section>

    <section className="inspiration"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90" alt="Comedor luminoso y cálido"/><div><span className="eyebrow">Ideas para habitar</span><h2>Una casa con lugar para todos.</h2><p>Texturas nobles, colores tranquilos y muebles que invitan a quedarse un ratito más.</p><button className="secondary" onClick={() => navigate('catalog', 'Comedor')}>Ver comedor</button></div></section>

    <FAQ />
    <section className="contact-strip"><div><span className="eyebrow">¿Querés preguntar algo?</span><h2>Del otro lado hay alguien.</h2><p>Mandanos un mensaje. Fulano está mirando el celular con los anteojos un poquito bajos.</p><button className="primary" onClick={() => navigate('contact')}><MessageCircle size={18}/> Escribir por WhatsApp</button></div><Fulano scene="phone"/></section>
  </main>
}

function FAQ() { const [open,setOpen]=useState(0); const items=[['¿Qué significa que un producto es bajo pedido?','Que lo encargamos especialmente después de confirmar con vos disponibilidad, precio, plazo y envío. No avanzamos sin que tengas toda la información.'],['¿Cuánto demora en llegar?','Depende del producto y del proveedor. En cada consulta te damos un plazo estimado antes de que confirmes.'],['¿Cómo se coordina el envío?','Revisamos tu ubicación y las características del mueble para informarte las opciones y el costo antes del pedido.'],['¿Puedo consultar antes de decidir?','Claro. La idea es que preguntes todo lo necesario, sin compromiso y con una persona real.']]; return <section className="section faq"><SectionTitle eyebrow="Preguntas frecuentes" title="Lo que suele andar dando vueltas"/><div>{items.map((x,i)=><button className={open===i?'open':''} key={x[0]} onClick={()=>setOpen(open===i?-1:i)}><span><strong>{x[0]}</strong><ChevronDown/></span>{open===i&&<p>{x[1]}</p>}</button>)}</div></section> }

function Catalog({ category, openProduct }) { const [query,setQuery]=useState(''); const [active,setActive]=useState(category||'Todos'); const shown=useMemo(()=>products.filter(p=>(active==='Todos'||p.category===active)&&p.name.toLowerCase().includes(query.toLowerCase())),[active,query]); return <main className="catalog-page"><section className="page-heading"><span className="eyebrow">Catálogo demo</span><h1>Muebles para hacer casa.</h1><p>Explorá con calma. Todos los productos de esta versión son demostrativos.</p></section><div className="catalog-tools"><label><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar un mueble…"/></label><div className="filters">{['Todos',...new Set(products.map(p=>p.category))].map(c=><button className={active===c?'active':''} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div></div>{shown.length?<div className="section product-grid catalog-grid">{shown.map(p=><ProductCard key={p.id} product={p} onOpen={openProduct}/>)}</div>:<div className="empty"><Fulano scene="search"/><h2>Acá no aparece nada… todavía.</h2><p>Fulano ya buscó hasta abajo del sillón. Probá con otra palabra o categoría.</p><button className="secondary" onClick={()=>{setQuery('');setActive('Todos')}}>Ver todos</button></div>}<div className="section"><FulanoHelp title="¿No sabés cuál elegir?" text="Contame un poco y ordenamos juntos las opciones." questions={['Para 1 o 2 personas','Para 3 o 4 personas','Para toda la familia']} /></div></main> }

function ProductDetail({ product, navigate }) { const [color,setColor]=useState(product.colors[0]); return <main className="detail-page"><button className="back" onClick={()=>navigate('catalog')}><ArrowLeft/> Volver a productos</button><section className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name}/><span className="tag">Bajo pedido</span></div><div className="detail-copy"><span className="eyebrow">{product.category} · CONTENIDO DEMO</span><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)}</p><p className="lead">{product.description}</p><div className="choice"><strong>Color: {color}</strong><div>{product.colors.map(c=><button className={color===c?'active':''} key={c} onClick={()=>setColor(c)}>{c}</button>)}</div></div><dl><div><dt><Ruler/>Medidas</dt><dd>{product.dimensions}</dd></div><div><dt><PackageCheck/>Material</dt><dd>{product.material}</dd></div><div><dt><Truck/>Modalidad</dt><dd>Bajo pedido · plazo a confirmar</dd></div></dl><button className="primary wide" onClick={()=>openWhatsApp(`Hola, quiero consultar por ${product.name} (${product.id}) en color ${color}.`)}><MessageCircle/> Consultar por WhatsApp</button><small className="demo-notice">Demostración: el número de WhatsApp y las condiciones comerciales todavía no están configurados.</small></div></section><section className="section detail-help"><FulanoHelp scene="measure" title="¿No sabés si entra?" text={`Este mueble mide ${product.dimensions}. Medí el espacio y también puertas, pasillos y ascensor.`} questions={['Me sobra espacio','Me queda justo','Necesito ayuda para medir']}/></section></main> }

function How({ navigate }) { return <main><section className="page-heading illustrated"><div><span className="eyebrow">Cómo comprar</span><h1>Fácil de explicar.<br/>Más fácil de hacer.</h1><p>Fulano trajo papeles y calculadora, pero en realidad son solo cuatro pasos.</p></div><Fulano scene="list"/></section><section className="section how-steps">{[['1','Elegís','Recorré el catálogo, revisá medidas y elegí tus variantes.'],['2','Confirmamos juntos','Nos escribís y verificamos producto, precio, plazo, pago y envío.'],['3','Lo pedimos','Con tu confirmación hacemos el pedido al proveedor especialmente para vos.'],['4','Te acompañamos','Te mantenemos al tanto y coordinamos la entrega cuando esté listo.']].map(x=><article key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p></article>)}</section><section className="section process-note"><Fulano scene="box"/><div><span className="eyebrow">Compra acompañada</span><h2>“Bajo pedido” no significa a ciegas.</h2><p>Antes de avanzar vas a saber las condiciones aplicables. Preferimos confirmar bien cada detalle a prometer algo que no podemos cumplir.</p><button className="primary" onClick={()=>navigate('catalog')}>Elegir un mueble</button></div></section><FAQ/></main> }

function About({ contact=false }) { return <main><section className="page-heading illustrated about-heading"><div><span className="eyebrow">{contact?'Contacto':'Nosotros'}</span><h1>{contact?'Fulano está del otro lado.':'Un nombre cualquiera. Una atención nada cualquiera.'}</h1><p>{contact?'Escribinos y contanos qué estás buscando. Te respondemos personalmente en el horario de atención.':'Fulano de Tal nace para hacer que elegir muebles sea más simple, cercano y transparente.'}</p>{contact&&<button className="primary" onClick={()=>openWhatsApp('Hola, quiero hacer una consulta sobre los muebles de Fulano de Tal.')}><MessageCircle/> Abrir WhatsApp</button>}</div><Fulano scene={contact?'phone':'hello'}/></section><section className="section story"><div><span className="eyebrow">Quién es Fulano</span><h2>Ese tipo confiable que siempre intenta darte una mano.</h2></div><div><p>No fabrica los muebles ni pretende saberlo todo. Es el personaje de la marca: amable, un poco tímido y dispuesto a buscar una respuesta cuando hace falta.</p><p>A veces se enreda con una cinta métrica. Otras, intenta levantar una caja demasiado grande. El chiste siempre cae sobre él, nunca sobre vos.</p><p className="placeholder-note">La ilustración actual es provisoria y será reemplazada por el personaje definitivo.</p></div></section>{!contact&&<section className="contact-strip"><div><span className="eyebrow">Hablemos</span><h2>¿En qué te damos una mano?</h2><p>Sin respuestas automáticas ni presión para comprar.</p><button className="primary" onClick={()=>openWhatsApp('Hola, quiero hacer una consulta.')}>Escribir por WhatsApp</button></div><Fulano scene="phone"/></section>}</main> }

export default function App(){ const [page,setPage]=useState('home'); const [category,setCategory]=useState(''); const [product,setProduct]=useState(null); const navigate=(next,data)=>{setPage(next); if(next==='catalog')setCategory(data||''); setProduct(null); window.scrollTo(0,0)}; const openProduct=p=>{setProduct(p);setPage('product');window.scrollTo(0,0)}; useEffect(()=>{const onPop=()=>navigate('home');window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]); return <><Header navigate={navigate} onSearch={()=>navigate('catalog')}/>{page==='home'&&<Home navigate={navigate} openProduct={openProduct}/>} {page==='catalog'&&<Catalog category={category} openProduct={openProduct}/>} {page==='product'&&product&&<ProductDetail product={product} navigate={navigate}/>} {page==='how'&&<How navigate={navigate}/>} {page==='about'&&<About/>} {page==='contact'&&<About contact/>}<Footer navigate={navigate}/></> }
