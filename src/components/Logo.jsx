import { brandAssets } from '../data/brandAssets'

export function BrandSeal({ className = '' }) {
  if (brandAssets.logoRound) {
    return <img className={`brand-seal-image ${className}`} src={brandAssets.logoRound} alt="Fulano de Tal — cuatro líneas comerciales" />
  }

  return <span className={`brand-seal-fallback ${className}`} aria-label="Espacio reservado para el sello de Fulano de Tal"><span>Fulano</span><strong>FT</strong><small>Una mano amiga</small></span>
}

export default function Logo({ onClick }) {
  return <button className="logo" onClick={onClick} aria-label="Ir al inicio">
    {brandAssets.logoHorizontal
      ? <img className="logo-image" src={brandAssets.logoHorizontal} alt="Fulano de Tal — cuatro líneas comerciales" />
      : <><BrandSeal className="logo-seal"/><span className="logo-copy"><strong>Fulano de Tal</strong><small>Un tipo que te da una mano</small></span></>}
  </button>
}
