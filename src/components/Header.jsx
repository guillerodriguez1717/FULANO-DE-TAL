import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

export default function Header({ navigate, onSearch }) {
  const [menu, setMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const closeMenu = () => {
    setMenu(false)
    if (window.matchMedia('(max-width: 600px)').matches) {
      document.querySelector('.mobile-menu-trigger')?.focus()
    }
  }
  const goTo = (destination) => {
    navigate(destination)
    closeMenu()
  }

  return <>
    <div className="topbar"><span>Fulano te da una mano</span><span className="topbar-detail">Atención personal · Preguntale a Fulano</span></div>
    <header>
      <button className="mobile-menu-trigger" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-expanded={menu} aria-controls="primary-navigation"><Menu/><span>Menú</span></button>
      <button className="mobile-brand-button" onClick={() => navigate('home')} aria-label="Ir al inicio">Fulano de Tal</button>
      <Logo onClick={() => navigate('home')}/>
      <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Navegación principal" onKeyDown={event => {
        if (event.key === 'Escape') {
          closeMenu()
        }
      }}>
        <button onClick={() => goTo('worlds')}>Líneas comerciales</button>
        <button onClick={() => goTo('how')}>Cómo consultar</button>
        <button onClick={() => goTo('about')}>Nosotros</button>
        <button className="mobile-close" onClick={closeMenu} aria-label="Cerrar menú"><X/></button>
      </nav>
      <div className="header-actions">
        <button className="search-button" aria-label="Buscar en el catálogo" aria-expanded={searchOpen} aria-controls="header-search-panel" onClick={() => setSearchOpen(v => !v)}><Search/><span>Buscar</span></button>
        <button className="whatsapp" onClick={() => navigate('contact')}>Hablemos</button>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Abrir menú" aria-expanded={menu} aria-controls="primary-navigation"><Menu/><span>Menú</span></button>
      </div>
    </header>
    <div id="header-search-panel" className={searchOpen ? "mobile-search-panel open" : "mobile-search-panel"} aria-hidden={!searchOpen} inert={!searchOpen}>
      <form onSubmit={(e)=>{e.preventDefault(); onSearch(searchTerm); setSearchOpen(false)}}>
        <Search/>
        <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="¿Qué estás buscando?" aria-label="Buscar en Fulano de Tal"/>
        <button type="submit">Buscar</button>
      </form>
    </div>
  </>
}
