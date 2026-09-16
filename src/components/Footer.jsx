import { useLang } from '../i18n.jsx'
import { CONTACT } from '../data/content.js'
import Icon from './Icons.jsx'

export default function Footer({ onLegal }) {
  const { t } = useLang()
  const f = t.footer
  const year = 2026

  const navLinks = [
    [t.nav.about, '#sobre'],
    [t.nav.services, '#servicos'],
    [t.nav.process, '#processo'],
    [t.nav.contact, '#contacto'],
  ]

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/logo-light.png" alt="GestPrime" className="footer__logo" />
          <p>{f.tagline}</p>
          <div className="footer__socials">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" width={20} height={20} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" width={20} height={20} />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon name="facebook" width={20} height={20} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>{f.navTitle}</h4>
          <ul>
            {navLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{f.contactTitle}</h4>
          <ul>
            <li>Rua Marquês de Fronteira, nº 131 B</li>
            <li>1070-298 Lisboa</li>
            {CONTACT.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {year} GestPrime · {f.rights}</span>
          <div className="footer__legal">
            <button type="button" onClick={() => onLegal('privacy')}>{f.privacy}</button>
            <span className="footer__legal-sep">·</span>
            <button type="button" onClick={() => onLegal('terms')}>{f.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
