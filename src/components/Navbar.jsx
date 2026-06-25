import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

const links = [
  ['about', 'sobre'],
  ['services', 'servicos'],
  ['process', 'processo'],
  ['contact', 'contacto'],
]

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = links.map(([, id]) => id)
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      // Scroll spy: the active section is the last one whose top has crossed the navbar.
      // Uses live viewport positions (getBoundingClientRect), so it is robust to layout
      // shifts from lazy-loaded images below the fold.
      const threshold = 140
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      }
      // Near the very bottom, force the last section active (covers short final sections).
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <button
        className={`nav__backdrop ${open ? 'is-show' : ''}`}
        onClick={close}
        aria-label="Fechar menu"
        tabIndex={open ? 0 : -1}
      />
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={close}>
          {/* Both logos are always in the DOM and cross-fade, so scrolling never
              causes a hard image swap or a flash while a new image loads. */}
          <span className="nav__logos">
            <img src="/logo-light.png" alt="GestPrime" className="nav__logo nav__logo--light" />
            <img src="/logo-transparent.png" alt="" aria-hidden="true" className="nav__logo nav__logo--dark" />
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map(([key, id]) => (
            <a
              key={key}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'true' : undefined}
              onClick={close}
            >
              {t.nav[key]}
            </a>
          ))}
          <a href="#contacto" className="btn btn--gold nav__cta" onClick={close}>
            {t.nav.cta}
          </a>
        </nav>

        <div className="nav__actions">
          <button className="lang" onClick={toggle} aria-label="Switch language">
            <span className={lang === 'pt' ? 'is-active' : ''}>PT</span>
            <span className="lang__sep">/</span>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
          </button>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
