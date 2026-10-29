import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, onConsult }) {
  const availability = {
    confirmed_stock: 'Stock confirmado',
    confirmed_order: 'Bajo pedido confirmado',
    unconfirmed: 'Disponibilidad a confirmar',
  }[product.availability]
  const productCode = product.productCode || ''

  return <article className="product-card product-card-clean">
    <div className="product-image">
      <img src={product.image} alt={product.imageAlt || product.name}/>
      {availability && <span className="tag">{availability}</span>}
    </div>
    <div className="product-info-clean">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <small>Código {productCode}</small>
      {product.description && <p className="product-description">{product.description}</p>}
      <p className="product-price">{formatPrice(product.price)}</p>
      {(product.dimensions || product.material || product.colors?.length || product.leadTime || product.shipping) && <details className="product-details">
        <summary>Detalles del producto</summary>
        <dl>
          {product.dimensions && <div><dt>Medidas</dt><dd>{product.dimensions}</dd></div>}
          {product.material && <div><dt>Material</dt><dd>{product.material}</dd></div>}
          {product.colors?.length > 0 && <div><dt>Colores</dt><dd>{product.colors.join(', ')}</dd></div>}
          {product.leadTime && <div><dt>Plazo</dt><dd>{product.leadTime}</dd></div>}
          {product.shipping && <div><dt>Entrega</dt><dd>{product.shipping}</dd></div>}
        </dl>
      </details>}
      {product.fulano && <div className="product-fulano"><b>Fulano dice:</b><span>{product.fulano}</span></div>}
      <button className="product-link" onClick={() => onConsult({ productName: product.name, productCode, lineId: product.lineId, details: product.category ? `Quería consultar por ${product.category.toLowerCase()}.` : '' })}>Ver detalles y consultar <ArrowRight size={17}/></button>
    </div>
  </article>
}
