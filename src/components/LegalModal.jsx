import { useEffect } from 'react'
import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

// doc: 'privacy' | 'terms' | null
export default function LegalModal({ doc, onClose }) {
  const { t } = useLang()

  useEffect(() => {
    if (!doc) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [doc, onClose])

  if (!doc) return null

  const L = t.legal
  const title = doc === 'privacy' ? L.privacyTitle : L.termsTitle
  const items = doc === 'privacy' ? L.privacy : L.terms

  return (
    <div className="legal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="legal__backdrop" onClick={onClose} />
      <div className="legal__panel">
        <header className="legal__head">
          <div>
            <h2>{title}</h2>
            <span className="legal__updated">{L.updated}</span>
          </div>
          <button className="legal__close" onClick={onClose} aria-label={L.close}>
            <Icon name="close" width={22} height={22} />
          </button>
        </header>
        <div className="legal__body">
          {items.map((s) => (
            <section key={s.h}>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
