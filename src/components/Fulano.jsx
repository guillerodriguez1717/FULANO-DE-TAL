export default function Fulano({ scene = 'hello', className = '' }) {
  const extras = {
    measure: <><path d="M20 142c35-25 68-24 102-4"/><path className="tape" d="M26 122c16 18 40-17 62 4s38-10 51 8"/><rect x="17" y="112" width="24" height="19" rx="5"/></>,
    phone: <><rect x="112" y="110" width="25" height="37" rx="5"/><path d="M119 117h11M124 137h2"/><path d="M62 72l-15 5M91 72l16 5"/></>,
    search: <><path d="M19 138c25-17 54-20 91-10"/><circle cx="125" cy="119" r="16"/><path d="M137 131l15 15"/></>,
    list: <><rect x="111" y="101" width="33" height="46" rx="3"/><path d="M118 111h18M118 120h18M118 129h13"/></>,
    box: <><path d="M10 142h142"/><path d="M105 106h43v36h-43zM105 106l21 13 22-13M126 119v23"/></>,
    hello: <path d="M108 116c14-8 24-18 29-32M137 84l7 7M137 84l-1-10"/>,
  }
  return (
    <svg className={`fulano-art ${className}`} viewBox="0 0 160 160" role="img" aria-label="Ilustración provisoria de Fulano ayudando">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path fill="var(--mustard)" d="M43 56c1-30 58-31 65 0-18-6-46-6-65 0Z"/>
        <path fill="var(--linen)" d="M48 54c-3 29 7 53 30 54 25 1 35-23 28-54"/>
        <path d="M58 70c4-3 9-3 13 0M86 70c4-3 9-3 13 0"/>
        <path d="M76 73c-2 7-3 12 2 13"/>
        <path strokeWidth="5" d="M58 87c8-9 14-4 20 2 6-6 13-11 22-2M62 89c3 10 11 13 16 2 6 11 15 7 19-2"/>
        <path fill="var(--terracotta)" d="M44 144c-1-27 10-39 34-39 25 0 37 12 37 39"/>
        <path d="M57 108v36M99 108v36M53 109h10M94 109h10"/>
        {extras[scene] || extras.hello}
      </g>
    </svg>
  )
}
