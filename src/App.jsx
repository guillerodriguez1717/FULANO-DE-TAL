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
  return <section className="newspaper-ticker" aria-label="Novedades de Fulano de Tal"><div className="ticker-track">{loop.map((notice, i) => <div className="ticker-notice" key={i}><span>EDICIÓN ESPECIAL</span><strong>{notice}</strong><b>✦</b></div>)}</div></section>
}

const shopWorlds = [
  {
    title: 'Deco, hogar y bazar',
    text: 'Objetos lindos y útiles para sumar a tu casa.',
    fulano: 'Chusmeá tranquilo. Una cosita acá, otra allá… y la casa cambia sin hacer un carnaval.',
    kicker: 'Para todos los días',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Eventos y repostería',
    text: 'Productos e insumos para cumpleaños, mesas dulces y ocasiones especiales.',
    fulano: 'Pispeá con tiempo, que para el cumple o la juntada es mejor que sobre una servilleta y no falte nada.',
    kicker: 'También mayorista',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Textil y empresas',
    text: 'Pedidos para equipos, eventos, empresas y trabajos textiles especiales.',
    fulano: 'Para el equipo, la empresa o la barra, lo charlamos y buscamos la vuelta. Cada pedido a su medida.',
    kicker: 'Para grupos y marcas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Personalizados',
    text: 'Regalos, tablas y detalles hechos especialmente para cada ocasión.',
    fulano: 'Si es para regalar, que tenga un poquito de historia. Si no, queda como mosquita muerta.',
    kicker: 'Hecho para vos',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  },
]

function Home({ navigate, openProduct }) {
  return <main>
    <section className="hero hero-integrated"><div className="hero-mini-ticker" aria-label="Qué podés encontrar en Fulano de Tal"><div className="hero-mini-ticker-track">{[...heroTickerItems,...heroTickerItems].map((item,i)=><span className="hero-mini-ticker-item" key={i}>{item}<b>✦</b></span>)}</div></div><div className="hero-image hero-fulano-welcome"><img src="file_00000000da08820ea26b112407de4c25.png" alt="Fulano dando la bienvenida y presentando productos de la tienda"/></div><div className="hero-copy"><div className="hero-tagline"><span>Fulano de Tal</span><strong>Un tipo que te da una mano.</strong></div><h1>Encontrá eso que <em>te viene haciendo falta.</em></h1><p>Te ayudamos a encontrar una buena opción para tu casa, tu negocio o tu proyecto, y coordinamos cada detalle con vos.</p><div className="hero-actions"><button className="primary" onClick={() => navigate('contact')}>Pedí tu presupuesto <ArrowRight size={18}/></button><button className="secondary" onClick={() => navigate('contact')}><MessageCircle size={18}/> Hablá con Fulano</button></div><div className="hero-trust-strip"><span><b>Compra clara</b><small>Todo confirmado antes</small></span><span><b>Te acompañamos</b><small>Durante todo el proceso</small></span><span><b>Entrega coordinada</b><small>Sin sorpresas</small></span></div></div></section>

    <section className="section category-section"><div className="category-heading"><span className="eyebrow">Muebles por ambiente</span><h2>Elegí el espacio. Fulano te da una mano.</h2><p>Después vemos juntos opciones, medidas y entrega. Sin hacer un mundo de cada cosa.</p></div><div className="category-grid">{categories.map(c => <button className="category-card category-card-clean" key={c.name} onClick={() => c.catalog ? navigate('catalog', c.name) : navigate('contact')}><span className="category-image"><img src={c.image} alt={c.name}/></span><span className="category-copy"><strong>{c.name}</strong><small>{c.subtitle}</small><span className="fulano-says"><b>Fulano dice:</b><span>{c.fulano}</span></span><span className="category-cta"><em>{c.catalog ? 'Ver muebles' : 'Consultar'}</em><ArrowRight/></span></span></button>)}</div></section>

    <section className="section worlds-section"><SectionTitle eyebrow="Muebles y algo más" title="Fulano también anda en otras cosas" text="Casa, eventos, trabajo o un regalo especial. Si hay algo útil para resolver, lo charlamos."/><div className="world-grid">{shopWorlds.map((world,i)=><article className="world-card" key={world.title}><div className="world-image"><img src={world.image} alt={world.title}/><span>{world.kicker}</span></div><div className="world-body"><small>{String(i+1).padStart(2,'0')} · FULANO DE TAL</small><h3>{world.title}</h3><p className="world-summary">{world.text}</p><div className="world-fulano"><b>Fulano dice:</b><span>{world.fulano}</span></div><button className="text-button world-cta" onClick={() => navigate('contact')}>Consultar <ArrowRight size={16}/></button></div></article>)}</div></section>

    <section className="coming-soon coming-soon-clean"><div className="coming-art"><img className="fulano-bike-image" src="fulano-bici.webp" alt="Fulano en bicicleta, saliendo a buscar nuevas ideas y productos"/></div><div className="coming-copy"><span className="eyebrow">PRÓXIMAMENTE</span><h2>Fulano agarró la bici y salió a investigar.</h2><p className="coming-lead">Hoy arrancamos por muebles y cosas útiles para la casa. Mañana, vaya uno a saber hasta dónde llega la bicicleta.</p><div className="coming-fulano"><b>Fulano dice:</b><span>“Si conocés algo que valga la pena, chiflame. Yo lo pispeo.”</span></div><button className="secondary" onClick={() => navigate('contact')}>Tengo una idea para Fulano</button></div></section>

    <section className="section products-section"><SectionTitle eyebrow="Los más mirados" title="Favoritos de la casa" action={<button className="text-button" onClick={() => navigate('catalog')}>Ver todos los muebles →</button>}/><div className="product-grid">{products.filter(p => p.featured).map(p => <ProductCard key={p.id} product={p} onOpen={openProduct}/>)}</div></section>

    <section className="order-section"><div className="order-intro"><span className="eyebrow">Bajo pedido, bien acompañado</span><h2>Vos elegís.<br/>Fulano se mueve.</h2><p>Antes de confirmar, revisamos juntos disponibilidad, plazo, envío y forma de pago. Claro desde el principio.</p><button className="secondary light" onClick={() => navigate('how')}>Conocé cómo funciona</button></div><div className="order-steps">{[['01','Elegís','El producto y las variantes que mejor van con tu casa.'],['02','Confirmamos','Disponibilidad, precio, plazo y entrega. Sin sorpresas.'],['03','Lo pedimos','Hacemos el pedido especialmente para vos.'],['04','Te acompañamos','Te contamos cómo avanza hasta que llega a casa.']].map(s => <div className="order-step" key={s[0]}><span>{s[0]}</span><div><h3>{s[1]}</h3><p>{s[2]}</p></div></div>)}</div></section>

    <section className="section help-feature"><FulanoHelp scene="list" onContact={() => navigate('contact')}/></section>

    <section className="section trust"><SectionTitle eyebrow="Comprar con tranquilidad" title="Las cosas claras hacen una buena casa"/><div className="trust-grid">{[[ShieldCheck,'Todo confirmado antes','Precio, plazo y condiciones claras antes de avanzar.'],[MessageCircle,'Personas, no respuestas automáticas','Preguntá lo que necesites. Te responde alguien de verdad.'],[PackageCheck,'Seguimiento cercano','Te acompañamos desde el pedido hasta la entrega.'],[Ruler,'Medidas a la vista','Información simple para elegir sin adivinar.']].map(([Icon,t,d]) => <div key={t}><Icon/><h3>{t}</h3><p>{d}</p></div>)}</div><p className="trust-fulano"><b>Fulano dice:</b> “Primero las cosas claras. Después sí, ponemos la pava.”</p></section>

    <FAQ />
    <section className="contact-strip contact-strip-final"><div><span className="eyebrow">Antes de irte</span><h2>¿Te quedó algo dando vueltas?</h2><p>Mandame un mensaje y lo vemos tranquilo. Sin compromiso y sin vueltas raras.</p><button className="primary" onClick={() => navigate('contact')}><MessageCircle size={18}/> Hablar con Fulano</button></div><Fulano scene="phone"/></section>
  </main>
}

function FAQ() { const [open,setOpen]=useState(0); const items=[['¿Qué significa que un producto es bajo pedido?','Que lo encargamos especialmente después de confirmar con vos disponibilidad, precio, plazo y envío. No avanzamos sin que tengas toda la información.'],['¿Cuánto demora en llegar?','Depende del producto y del proveedor. En cada consulta te damos un plazo estimado antes de que confirmes.'],['¿Cómo se coordina el envío?','Revisamos tu ubicación y las características del mueble para informarte las opciones y el costo antes del pedido.'],['¿Puedo consultar antes de decidir?','Claro. La idea es que preguntes todo lo necesario, sin compromiso y con una persona real.']]; return <section className="section faq"><SectionTitle eyebrow="Preguntas frecuentes" title="Lo que suele andar dando vueltas"/><div>{items.map((x,i)=><button className={open===i?'open':''} key={x[0]} onClick={()=>setOpen(open===i?-1:i)}><span><strong>{x[0]}</strong><ChevronDown/></span>{open===i&&<p>{x[1]}</p>}</button>)}</div></section> }

function Catalog({ category, openProduct, navigate }) { const [query,setQuery]=useState(''); const [active,setActive]=useState(category||'Todos'); const categories=['Todos',...new Set(products.map(p=>p.category))]; const shown=useMemo(()=>products.filter(p=>{const q=query.trim().toLowerCase(); return (active==='Todos'||p.category===active)&&(!q||[p.name,p.category,p.description,p.material].filter(Boolean).some(v=>v.toLowerCase().includes(q)))}),[active,query]); const clear=()=>{setQuery('');setActive('Todos')}; return <main className="catalog-page"><section className="page-heading catalog-heading"><span className="eyebrow">Muebles bajo pedido</span><h1>Chusmeá tranquilo.</h1><p>Buscá por ambiente o por nombre. Antes de pedir, confirmamos con vos precio, disponibilidad, plazo y entrega.</p><div className="catalog-fulano"><b>Fulano dice:</b><span>Mirá sin apuro. Si algo te gusta pero no sabés si entra, lo medimos antes de hacer macanas.</span></div></section><section className="catalog-controls"><label className="catalog-search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="¿Qué estás buscando?"/></label><div className="catalog-meta"><strong>{shown.length}</strong> {shown.length===1?'producto':'productos'} {active!=='Todos'&&<>en <b>{active}</b></>}</div><div className="filters">{categories.map(c=><button className={active===c?'active':''} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div></section>{shown.length?<div className="section product-grid catalog-grid">{shown.map(p=><ProductCard key={p.id} product={p} onOpen={openProduct}/>)}</div>:<div className="empty catalog-empty"><Fulano scene="search"/><h2>Por acá no apareció nada.</h2><p>Fulano ya pispeó hasta abajo del sillón. Probá otra palabra o volvé a ver todo el catálogo.</p><button className="secondary" onClick={clear}>Ver todo</button></div>}<section className="catalog-help"><div><span className="eyebrow">¿No encontraste lo que buscabas?</span><h2>No quiere decir que no lo podamos conseguir.</h2><p>Contanos qué necesitás, las medidas que tenés o mandanos una referencia. Fulano busca la vuelta.</p></div><button className="primary" onClick={()=>navigate('contact')}><MessageCircle size={18}/> Preguntale a Fulano</button></section></main> }

function ProductDetail({ product, navigate }) { const [color,setColor]=useState(product.colors[0]); return <main className="detail-page"><button className="back" onClick={()=>navigate('catalog')}><ArrowLeft/> Volver al catálogo</button><section className="product-detail product-detail-clean"><div className="detail-image"><img src={product.image} alt={product.name}/><span className="tag">Bajo pedido</span></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="detail-price">{formatPrice(product.price)}</p><p className="detail-price-note">Precio de referencia · se confirma antes de realizar el pedido.</p><p className="lead">{product.description}</p>{product.fulano&&<div className="detail-fulano"><b>Fulano dice:</b><span>{product.fulano}</span></div>}<div className="choice"><strong>Terminación / color: {color}</strong><div>{product.colors.map(c=><button className={color===c?'active':''} key={c} onClick={()=>setColor(c)}>{c}</button>)}</div></div><dl><div><dt><Ruler/>Medidas</dt><dd>{product.dimensions}</dd></div><div><dt><PackageCheck/>Material</dt><dd>{product.material}</dd></div><div><dt><Truck/>Entrega</dt><dd>Se cotiza y coordina según tu localidad.</dd></div><div><dt><ShieldCheck/>Pedido</dt><dd>Confirmamos disponibilidad, precio y plazo antes de avanzar.</dd></div></dl><div className="detail-order-note"><strong>¿Cómo se compra?</strong><span>Primero dejamos todo claro. Después se confirma el pedido y coordinamos cada paso con vos.</span></div><button className="primary wide" onClick={()=>navigate('contact')}><MessageCircle/> Consultar este producto</button><small className="demo-notice">Este catálogo está en preparación. Los precios y condiciones publicados son de referencia hasta incorporar los productos definitivos.</small></div></section><section className="section detail-measure"><div><span className="eyebrow">Antes de pedir</span><h2>Medí dos veces. Renegá ninguna.</h2><p>Este mueble mide <strong>{product.dimensions}</strong>. Revisá también puertas, pasillos, escaleras o ascensor. Si te queda justo, preguntale a Fulano antes de hacer macanas.</p></div><button className="secondary" onClick={()=>navigate('contact')}>Necesito ayuda para medir</button></section></main> }

function How({ navigate }) { return <main><section className="page-heading illustrated"><div><span className="eyebrow">Cómo comprar</span><h1>Fácil de explicar.<br/>Más fácil de hacer.</h1><p>Fulano trajo papeles y calculadora, pero en realidad son solo cuatro pasos.</p></div><Fulano scene="list"/></section><section className="section how-steps">{[['1','Elegís','Recorré el catálogo, revisá medidas y elegí tus variantes.'],['2','Confirmamos juntos','Nos escribís y verificamos producto, precio, plazo, pago y envío.'],['3','Lo pedimos','Con tu confirmación hacemos el pedido al proveedor especialmente para vos.'],['4','Te acompañamos','Te mantenemos al tanto y coordinamos la entrega cuando esté listo.']].map(x=><article key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p></article>)}</section><section className="section process-note"><Fulano scene="box"/><div><span className="eyebrow">Compra acompañada</span><h2>“Bajo pedido” no significa a ciegas.</h2><p>Antes de avanzar vas a saber las condiciones aplicables. Preferimos confirmar bien cada detalle a prometer algo que no podemos cumplir.</p><button className="primary" onClick={()=>navigate('catalog')}>Elegir un mueble</button></div></section><FAQ/></main> }


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

function About({ contact=false }) { return <main><section className="page-heading illustrated about-heading"><div><span className="eyebrow">{contact?'Contacto':'Nosotros'}</span><h1>{contact?'Fulano está del otro lado.':'Un nombre cualquiera. Una atención nada cualquiera.'}</h1><p>{contact?'Escribinos y contanos qué estás buscando. Te respondemos personalmente en el horario de atención.':'Fulano de Tal nace para hacer que elegir muebles sea más simple, cercano y transparente.'}</p>{contact&&<button className="primary" onClick={()=>openWhatsApp('Hola, quiero hacer una consulta sobre los muebles de Fulano de Tal.')}><MessageCircle/> Abrir WhatsApp</button>}</div><Fulano scene={contact?'phone':'hello'}/></section><section className="section story"><div><span className="eyebrow">Quién es Fulano</span><h2>Ese tipo confiable que siempre intenta darte una mano.</h2></div><div><p>No fabrica los muebles ni pretende saberlo todo. Es el personaje de la marca: amable, un poco tímido y dispuesto a buscar una respuesta cuando hace falta.</p><p>A veces se enreda con una cinta métrica. Otras, intenta levantar una caja demasiado grande. El chiste siempre cae sobre él, nunca sobre vos.</p><p className="placeholder-note">La ilustración actual es provisoria y será reemplazada por el personaje definitivo.</p></div></section>{!contact&&<section className="contact-strip"><div><span className="eyebrow">Hablemos</span><h2>¿En qué te damos una mano?</h2><p>Sin respuestas automáticas ni presión para comprar.</p><button className="primary" onClick={()=>openWhatsApp('Hola, quiero hacer una consulta.')}>Escribir por WhatsApp</button></div><Fulano scene="phone"/></section>}</main> }

export default function App(){ const [page,setPage]=useState('home'); const [category,setCategory]=useState(''); const [legalSection,setLegalSection]=useState('terms'); const [product,setProduct]=useState(null); const navigate=(next,data)=>{setPage(next); if(next==='catalog')setCategory(data||''); if(next==='legal')setLegalSection(data||'terms'); setProduct(null); window.scrollTo(0,0)}; const openProduct=p=>{setProduct(p);setPage('product');window.scrollTo(0,0)}; useEffect(()=>{const onPop=()=>navigate('home');window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]); return <><Header navigate={navigate} onSearch={()=>navigate('catalog')}/>{page==='home'&&<Home navigate={navigate} openProduct={openProduct}/>} {page==='catalog'&&<Catalog category={category} openProduct={openProduct} navigate={navigate}/>} {page==='product'&&product&&<ProductDetail product={product} navigate={navigate}/>} {page==='how'&&<How navigate={navigate}/>} {page==='about'&&<About/>} {page==='contact'&&<About contact/>} {page==='legal'&&<Legal section={legalSection} navigate={navigate}/>}<Footer navigate={navigate}/></> }
