import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

export default function Header({ navigate, onSearch }) {
  const [menu, setMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const goTo = (destination) => {
    navigate(destination)
    setMenu(false)
  }

  return <>
    <div className="topbar"><span>Fulano te da una mano</span><span className="topbar-detail">Atención personal · Preguntale a Fulano</span></div>
    <header>
      <button className="mobile-menu-trigger" onClick={() => setMenu(true)} aria-label="Abrir menú"><Menu/><span>Menú</span></button>
      <button className="mobile-brand-button" onClick={() => navigate('home')} aria-label="Ir al inicio">Fulano de Tal</button>
      <Logo onClick={() => navigate('home')}/>
      <nav className={menu ? 'open' : ''} aria-label="Navegación principal">
        <button onClick={() => goTo('worlds')}>Productos</button>
        <button onClick={() => goTo('how')}>Cómo comprar</button>
        <button onClick={() => goTo('about')}>Nosotros</button>
        <button className="mobile-close" onClick={() => setMenu(false)} aria-label="Cerrar menú"><X/></button>
      </nav>
      <div className="header-actions">
        <button className="search-button" aria-label="Buscar productos" onClick={() => setSearchOpen(v => !v)}><Search/><span>Buscar</span></button>
        <button className="whatsapp" onClick={() => navigate('contact')}>Hablemos</button>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Abrir menú"><Menu/><span>Menú</span></button>
      </div>
    </header>
    <div className={searchOpen ? "mobile-search-panel open" : "mobile-search-panel"}>
      <form onSubmit={(e)=>{e.preventDefault(); onSearch(searchTerm); setSearchOpen(false)}}>
        <Search/>
        <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="¿Qué estás buscando?" aria-label="Buscar en Fulano de Tal"/>
        <button type="submit">Buscar</button>
      </form>
    </div>
  </>
}
