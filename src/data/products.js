// El catálogo permanece vacío hasta recibir y validar información comercial real.
export const products = []

export const commercialLines = [
  {
    id: 'muebles-deco-bazar',
    name: 'Muebles, Deco y Bazar',
    referenceCode: 'MDB',
    categories: ['Muebles', 'Deco', 'Bazar', 'Importados'],
    supplier: 'Río Shop Deco',
    featured: true,
    kicker: 'La línea principal de Fulano',
    description: 'Muebles, decoración y bazar para darle otra vuelta a tu casa. También podés preguntar por importados.',
    fulano: 'Contame qué rincón querés renovar y le buscamos la vuelta juntos.',
    image: 'file_00000000da08820ea26b112407de4c25.png',
    sellingProcess: 'Fulano recibe tu consulta y te asesora. Si se trata de un producto de Río Shop Deco, esa empresa realiza la venta, el cobro y la facturación. Cada paso se coordina conversándolo con vos.',
    benefitNote: 'En algunos productos seleccionados podría haber beneficios especiales. Preguntá y confirmamos qué opciones están disponibles.',
  },
  {
    id: 'perfumeria',
    name: 'Perfumería',
    referenceCode: 'PER',
    categories: ['Perfumería'],
    supplier: 'Aromatta',
    kicker: 'Un detalle que deja huella',
    description: 'Una línea para encontrar esa fragancia que va con vos.',
    fulano: 'Contame qué aroma tenés en mente y lo conversamos.',
    image: '',
  },
  {
    id: 'cotillon-descartables',
    name: 'Cotillón y Descartables',
    referenceCode: 'CD',
    categories: ['Cotillón', 'Decoración para fiestas', 'Descartables'],
    kicker: 'Fiestas, encuentros y mucho más',
    description: 'Cotillón para celebrar y descartables para acompañar cada encuentro.',
    fulano: '¿Se viene festejo o juntada? Contame qué estás organizando.',
    image: '',
  },
  {
    id: 'textiles-por-encargo',
    name: 'Textiles por encargo',
    referenceCode: 'TEX',
    categories: ['Empresas', 'Clubes', 'Instituciones', 'Eventos'],
    kicker: 'Ideas hechas para cada proyecto',
    description: 'Proyectos textiles para empresas, clubes, instituciones y eventos.',
    fulano: 'Contame para quién es el proyecto y qué tenés en mente.',
    image: '',
  },
]

export const catalogWorlds = commercialLines.map(({ id, name }) => ({ id, name }))
export const catalogCategories = commercialLines.flatMap(line =>
  line.categories.map(name => ({ id: name.toLowerCase().replaceAll(' ', '-'), name, lineId: line.id })),
)

// Propuesta de referencia manual: FT-<línea>-<código de producto, si existe>.
// No se asignan códigos de consulta ni se registra seguimiento automáticamente.
export const productTemplate = {
  id: '',
  lineId: '',
  name: '',
  productCode: '',
  category: '',
  supplier: '',
  supplierCode: '',
  price: null,
  previousPrice: null,
  availability: 'unconfirmed',
  image: '',
  gallery: [],
  description: '',
  dimensions: '',
  material: '',
  colors: [],
  leadTime: '',
  shipping: '',
  payment: '',
  fulfillment: '',
  stock: null,
  featured: false,
  benefitAvailable: false,
  benefitConfirmed: false,
  fulano: '',
  publicationStatus: 'draft',
}

export const formatPrice = (price) => price == null ? 'Precio a confirmar' : `$ ${new Intl.NumberFormat('es-AR').format(price)}`
