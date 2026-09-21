// ESTRUCTURA DEL CATALOGO REAL.
// Mientras no haya catalogos confirmados, no publicamos productos, precios ni ofertas ficticias.
export const products = []

// Universos principales de Fulano. Sirven para filtros, futuras cargas y El Diario.
export const catalogWorlds = [
  { id: 'muebles', name: 'Muebles' },
  { id: 'deco-hogar-bazar', name: 'Deco, hogar y bazar' },
  { id: 'eventos-reposteria', name: 'Eventos y repostería' },
  { id: 'textil-empresas', name: 'Textil y empresas' },
  { id: 'personalizados', name: 'Personalizados' },
]

// Plantilla de referencia para cargar productos reales cuando lleguen los catalogos.
// No se exporta como producto ni se muestra en la tienda.
export const productTemplate = {
  id: '',
  name: '',
  world: '',
  category: '',
  supplier: '',
  supplierCode: '',
  price: null,
  previousPrice: null,
  image: '',
  gallery: [],
  description: '',
  dimensions: '',
  material: '',
  colors: [],
  leadTime: '',
  shipping: '',
  payment: '',
  featured: false,
  weeklyOffer: false,
  offerStart: '',
  offerEnd: '',
  offerLabel: '',
  fulano: '',
}

export const categories = [
  { name: 'Living', subtitle: 'Sillones, racks y mesas', fulano: 'Para tirarse a ver el partido, una peli o charlar un rato. Que sea cómodo; después vemos la pinta.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Comedor', subtitle: 'Mesas, sillas y guardado', fulano: 'Que la mesa banque el asado, la picada y esas sobremesas que se estiran. Con eso ya arrancamos bien.', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Dormitorio', subtitle: 'Mesas de luz, cómodas y placares', fulano: 'Acá no hace falta inventar la pólvora: que sea cómodo, ordenado y te deje descansar.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Cocina', subtitle: 'Soluciones prácticas', fulano: 'Que sirva de verdad y no te haga renegar. Después, si le dicen funcional, será por algo.', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Baño', subtitle: 'Muebles funcionales', fulano: 'Chiquito o grande, siempre hay forma de acomodarlo sin meter la pata.', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Oficina', subtitle: 'Escritorios y bibliotecas', fulano: 'Si hay que laburar, por lo menos que el cuerpo no pase factura. Vemos algo cómodo y listo.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'Guardado', subtitle: 'Módulos y organización', fulano: 'Cada cosa en su lugar y santo remedio. Te ayudo a encontrar dónde guardar todo eso.', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=85', catalog: true },
  { name: 'A medida', subtitle: 'Contanos tu espacio', fulano: 'Si el hueco viene atravesado, no te hagas problema. Le buscamos la vuelta.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', catalog: false },
]

export const formatPrice = (price) => price == null ? 'Precio a confirmar' : `$ ${new Intl.NumberFormat('es-AR').format(price)}`
