export default function Logo({ onClick }) {
  return <button className="logo" onClick={onClick} aria-label="Ir al inicio"><span className="logo-mark">FT</span><span><strong>Fulano de Tal</strong><small>Muebles y más</small></span></button>
}
