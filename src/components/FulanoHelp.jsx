import { MessageCircle, ArrowRight } from 'lucide-react'
import Fulano from './Fulano'

export default function FulanoHelp({
  title = '¿Tenés una duda? Preguntale a Fulano.',
  text = 'No hace falta tener todo resuelto. Contame qué estás buscando y lo vemos tranquilo.',
  scene = 'list',
  onContact
}) {
  return <aside className="fulano-help fulano-help-clean">
    <div className="help-character"><Fulano scene={scene} /></div>
    <div className="help-copy">
      <span className="eyebrow">Un tipo que te da una mano</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="help-fulano-line"><b>Fulano dice:</b><span>“Chiflame y lo vemos. Sin compromiso.”</span></div>
      <button className="primary help-contact" onClick={onContact}>
        <MessageCircle size={18}/> Hablar con Fulano <ArrowRight size={17}/>
      </button>
      <small>Consultas sobre muebles, medidas, pedidos especiales, tiempos y entrega.</small>
    </div>
  </aside>
}
