// El catálogo permanece vacío hasta recibir y validar información comercial real.
export const products = []
export const offers = []

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

export function isPublishedProduct(product) {
  const line = commercialLines.find(item => item.id === product?.lineId)
  return product?.approvalStatus === 'approved'
    && product.publicationStatus === 'published'
    && typeof product.id === 'string'
    && product.id.length > 0
    && typeof product.name === 'string'
    && product.name.trim().length > 0
    && typeof product.productCode === 'string'
    && product.productCode.trim().length > 0
    && line?.categories.includes(product.category)
    && typeof product.image === 'string'
    && product.image.trim().length > 0
}

export const publishedProducts = products.filter(isPublishedProduct)

function normalizeSearchText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-AR').trim()
}

export function searchPublishedProducts({ query = '', lineId = '', category = '' } = {}) {
  const search = normalizeSearchText(query)
  const normalizedCategory = normalizeSearchText(category)
  return publishedProducts.filter(product => {
    if (lineId && product.lineId !== lineId) return false
    if (normalizedCategory && normalizeSearchText(product.category) !== normalizedCategory) return false
    if (!search) return true
    const line = commercialLines.find(item => item.id === product.lineId)
    return normalizeSearchText([
      product.name,
      product.productCode,
      product.category,
      product.description,
      line?.name,
    ].join(' ')).includes(search)
  })
}

export function getPublishedOffers(asOf = new Date(), items = offers, catalog = publishedProducts) {
  const date = [
    asOf.getFullYear(),
    String(asOf.getMonth() + 1).padStart(2, '0'),
    String(asOf.getDate()).padStart(2, '0'),
  ].join('-')
  const approvedProductIds = new Set(catalog.map(product => product.id))
  return items.filter(offer =>
    typeof offer?.id === 'string'
    && offer.id.length > 0
    && offer.approvalStatus === 'approved'
    && offer.publicationStatus === 'published'
    && approvedProductIds.has(offer.productId)
    && /^\d{4}-\d{2}-\d{2}$/.test(offer.startDate)
    && /^\d{4}-\d{2}-\d{2}$/.test(offer.expiresOn)
    && isCalendarDate(offer.startDate)
    && isCalendarDate(offer.expiresOn)
    && offer.startDate <= offer.expiresOn
    && offer.startDate <= date
    && date <= offer.expiresOn
  )
}

export const publishedOffers = getPublishedOffers()

function isCalendarDate(value) {
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

// Propuesta de referencia manual: FT-<línea>-<código de producto, si existe>.
// No se asignan códigos de consulta ni se registra seguimiento automáticamente.
export const productTemplate = {
  id: '',
  lineId: '',
  approvalStatus: 'pending',
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
  fulano: '',
  publicationStatus: 'draft',
}

export const offerTemplate = {
  id: '',
  productId: '',
  headline: '',
  description: '',
  approvalStatus: 'pending',
  publicationStatus: 'draft',
  startDate: '',
  expiresOn: '',
}

export const formatPrice = (price) => price == null ? 'Precio a confirmar' : `$ ${new Intl.NumberFormat('es-AR').format(price)}`
