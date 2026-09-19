import { ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../data/products'
export default function ProductCard({ product, onOpen }) {
  return <article className="product-card" onClick={() => onOpen(product)}>
    <button className="product-image" aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name}/><span className="tag">Bajo pedido</span></button>
    <div className="product-info"><div><span>{product.category}</span><h3>{product.name}</h3><p>{formatPrice(product.price)}</p></div><button className="round-button" aria-label={`Ver detalle de ${product.name}`}><ArrowUpRight size={20}/></button></div>
  </article>
}
