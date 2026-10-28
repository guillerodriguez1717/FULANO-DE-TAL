import Logo from './Logo'

export default function Footer({ navigate }) {
  return <footer>
    <div>
      <Logo onClick={() => navigate('home')}/>
      <p>Fulano de Tal · Muebles, Deco y Bazar como línea principal, Perfumería, Cotillón y Descartables, y Textiles por encargo. Consultas claras y atención personal.</p>
    </div>
    <div>
      <strong>Recorré</strong>
      <button onClick={() => navigate('worlds')}>Líneas comerciales</button>
      <button onClick={() => navigate('how')}>Cómo consultar</button>
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
