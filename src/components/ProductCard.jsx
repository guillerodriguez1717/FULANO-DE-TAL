import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, onOpen }) {
  return <article className="product-card product-card-clean">
    <button className="product-image" aria-label={`Ver ${product.name}`} onClick={() => onOpen(product)}>
      <img src={product.image} alt={product.name}/>
      <span className="tag">Bajo pedido</span>
    </button>
    <div className="product-info-clean">
      <span className="product-category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="product-price">{formatPrice(product.price)}</p>
      {product.fulano && <div className="product-fulano"><b>Fulano dice:</b><span>{product.fulano}</span></div>}
      <button className="product-link" onClick={() => onOpen(product)}>Ver más <ArrowRight size={17}/></button>
    </div>
  </article>
}
