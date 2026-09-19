import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

export default function Header({ navigate, onSearch }) {
  const [menu, setMenu] = useState(false)
  const goTo = (destination) => {
    navigate(destination)
    setMenu(false)
  }

  return <>
    <div className="topbar"><span>Fulano te da una mano</span><span className="topbar-detail">Atención personal · Consultanos por WhatsApp</span></div>
    <header>
      <button className="mobile-brand-button" onClick={() => navigate('home')} aria-label="Ir al inicio">Fulano</button>
      <Logo onClick={() => navigate('home')}/>
      <nav className={menu ? 'open' : ''} aria-label="Navegación principal">
        <button onClick={() => goTo('catalog')}>Productos</button>
        <button onClick={() => goTo('how')}>Cómo comprar</button>
        <button onClick={() => goTo('about')}>Nosotros</button>
        <button className="mobile-close" onClick={() => setMenu(false)} aria-label="Cerrar menú"><X/></button>
      </nav>
      <div className="header-actions">
        <button className="search-button" aria-label="Buscar productos" onClick={onSearch}><Search/><span>Buscar</span></button>
        <button className="whatsapp" onClick={() => navigate('contact')}>Hablemos</button>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Abrir menú"><Menu/><span>Menú</span></button>
      </div>
    </header>
  </>
}
