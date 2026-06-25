import { useEffect, useState } from 'react'
import { CONTACT } from '../data/content.js'
import Icon from './Icons.jsx'

export default function FloatingButtons() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wa = `https://wa.me/${CONTACT.phonePrimaryE164.replace('+', '')}`

  return (
    <div className="floats">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="float float--wa"
        aria-label="WhatsApp"
      >
        <Icon name="whatsapp" width={26} height={26} />
      </a>
      <button
        className={`float float--top ${show ? 'is-show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        <Icon name="arrowUp" width={22} height={22} />
      </button>
    </div>
  )
}
