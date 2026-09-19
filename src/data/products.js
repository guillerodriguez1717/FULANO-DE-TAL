// CONTENIDO EXCLUSIVAMENTE DEMO. Reemplazar este arreglo por el catálogo real o un CMS.
export const products = [
  { id: 'sillon-nido', name: 'Sillón Nido', category: 'Living', price: 689000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85', description: 'Un sillón amplio y mullido, pensado para hacer del living el lugar favorito de la casa.', dimensions: '210 × 92 × 84 cm', material: 'Tapizado texturado y estructura de madera', colors: ['Arena', 'Oliva', 'Terracota'], featured: true },
  { id: 'mesa-cauce', name: 'Mesa Cauce', category: 'Comedor', price: 548000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85', description: 'Mesa de líneas simples y presencia cálida para compartir todos los días.', dimensions: '180 × 90 × 76 cm', material: 'Madera en tono natural', colors: ['Natural', 'Nogal'], featured: true },
  { id: 'rack-orilla', name: 'Rack Orilla', category: 'Living', price: 329000, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', description: 'Guardado simple y ordenado para que la tecnología no se robe todo el protagonismo.', dimensions: '160 × 40 × 55 cm', material: 'Madera enchapada', colors: ['Natural', 'Petiribí'], featured: true },
  { id: 'mesa-luz-calma', name: 'Mesa de luz Calma', category: 'Dormitorio', price: 148000, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85', description: 'Una mesa compacta con cajón, estante y todo lo necesario al alcance de la mano.', dimensions: '48 × 38 × 58 cm', material: 'Madera y frente laqueado', colors: ['Marfil', 'Oliva'], featured: false },
  { id: 'escritorio-pausa', name: 'Escritorio Pausa', category: 'Oficina', price: 286000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85', description: 'Una superficie cómoda y liviana para trabajar sin invadir toda la casa.', dimensions: '120 × 58 × 75 cm', material: 'Madera y estructura metálica', colors: ['Natural', 'Negro'], featured: true },
  { id: 'biblioteca-vuelta', name: 'Biblioteca Vuelta', category: 'Guardado', price: 394000, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=85', description: 'Estantes abiertos para libros, objetos queridos y esas cosas que cuentan historias.', dimensions: '90 × 35 × 190 cm', material: 'Madera enchapada', colors: ['Natural', 'Nogal'], featured: false },
]

export const categories = [
  { name: 'Living', subtitle: 'Sillones, racks y mesas', image: products[0].image, catalog: true },
  { name: 'Comedor', subtitle: 'Mesas, sillas y guardado', image: products[1].image, catalog: true },
  { name: 'Dormitorio', subtitle: 'Mesas de luz y guardado', image: products[3].image, catalog: true },
  { name: 'Cocina', subtitle: 'Muebles y soluciones a pedido', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85', catalog: false },
  { name: 'Baño', subtitle: 'Vanitorys y guardado', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85', catalog: false },
  { name: 'Oficina', subtitle: 'Escritorios y bibliotecas', image: products[4].image, catalog: true },
  { name: 'Guardado', subtitle: 'Bibliotecas, módulos y más', image: products[5].image, catalog: true },
  { name: 'A medida', subtitle: 'Contanos el espacio y lo vemos', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', catalog: false },
]

export const formatPrice = (price) => `$ ${new Intl.NumberFormat('es-AR').format(price)}`
