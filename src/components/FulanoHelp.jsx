import { useState } from 'react'
import Fulano from './Fulano'

export default function FulanoHelp({ title = '¿No sabés cuál elegir?', text = 'Fulano te da una mano.', scene = 'measure', questions = [] }) {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  return <aside className={`fulano-help ${open ? 'is-open' : ''}`}>
    <Fulano scene={scene} />
    <div><span className="eyebrow">Fulano te da una mano</span><h3>{title}</h3><p>{text}</p>
      {open && <div className="help-options">{questions.map(q => <button key={q} className={answer === q ? 'selected' : ''} onClick={() => setAnswer(q)}>{q}</button>)}{answer && <p className="help-answer">Perfecto. Voy a mostrarte opciones pensando en “{answer}”.</p>}</div>}
      {questions.length > 0 && <button className="text-button" onClick={() => setOpen(!open)}>{open ? 'Cerrar ayuda' : 'Ayudame a elegir →'}</button>}
    </div>
  </aside>
}
