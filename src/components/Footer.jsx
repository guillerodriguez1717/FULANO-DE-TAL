import Logo from './Logo'

export default function Footer({ navigate }) {
  return <footer>
    <div>
      <Logo onClick={() => navigate('home')}/>
      <p>Fulano de Tal · Muebles y algo más. Pispeá tranquilo; si necesitás una mano, acá estamos.</p>
    </div>
    <div>
      <strong>Recorré</strong>
      <button onClick={() => navigate('catalog')}>Productos</button>
      <button onClick={() => navigate('how')}>Cómo comprar</button>
      <button onClick={() => navigate('about')}>Nosotros</button>
    </div>
    <div>
      <strong>Ayuda y legales</strong>
      <button onClick={() => navigate('legal', 'terms')}>Términos de compra</button>
      <button onClick={() => navigate('legal', 'returns')}>Cambios y devoluciones</button>
      <button onClick={() => navigate('legal', 'privacy')}>Privacidad</button>
      <button className="footer-withdrawal" onClick={() => navigate('legal', 'withdrawal')}>Botón de arrepentimiento</button>
    </div>
    <div>
      <strong>¿Dudas?</strong>
      <p>Atención personalizada<br/>Pilar, Córdoba</p>
      <button className="footer-contact" onClick={() => navigate('contact')}>Hablar con Fulano →</button>
    </div>
    <div className="footer-bottom"><span>© 2026 Fulano de Tal · Sitio en preparación</span><span>Un tipo que te da una mano.</span></div>
  </footer>
}
