import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'
export default function Header({ navigate, onSearch }) {
 const [menu, setMenu] = useState(false)
 return <><div className="topbar">Atención personal · Consultanos por WhatsApp</div><header><Logo onClick={() => navigate('home')}/><nav className={menu ? 'open' : ''}>{['Productos','Cómo comprar','Nosotros'].map(x => <button key={x} onClick={() => {navigate(x === 'Productos' ? 'catalog' : x === 'Cómo comprar' ? 'how' : 'about'); setMenu(false)}}>{x}</button>)}<button className="mobile-close" onClick={() => setMenu(false)}><X/></button></nav><div className="header-actions"><button aria-label="Buscar" onClick={onSearch}><Search/></button><button className="whatsapp" onClick={() => navigate('contact')}>Hablemos</button><button className="menu-button" onClick={() => setMenu(true)} aria-label="Abrir menú"><Menu/></button></div></header></>
}
