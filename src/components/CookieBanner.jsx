import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

export default function CookieBanner() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('gp-cookies')) setShow(true)
  }, [])

  const choose = (value) => {
    localStorage.setItem('gp-cookies', value)
    setShow(false)
  }

  if (!show) return null
  return (
    <div className="cookies" role="dialog" aria-live="polite">
      <p>{t.cookies.text}</p>
      <div className="cookies__actions">
        <button className="btn btn--ghost-dark" onClick={() => choose('essential')}>
          {t.cookies.essential}
        </button>
        <button className="btn btn--gold" onClick={() => choose('all')}>
          {t.cookies.accept}
        </button>
      </div>
    </div>
  )
}
