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
      {product.image && <img src={product.image} alt={product.name}/>}
      {availability && <span className="tag">{availability}</span>}
    </div>
    <div className="product-info-clean">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      {productCode && <small>Código {productCode}</small>}
      <p className="product-price">{formatPrice(product.price)}</p>
      {product.fulano && <div className="product-fulano"><b>Fulano dice:</b><span>{product.fulano}</span></div>}
      <button className="product-link" onClick={() => onConsult({ productName: product.name, productCode, lineId: product.lineId })}>Consultar con Fulano <ArrowRight size={17}/></button>
    </div>
  </article>
}
