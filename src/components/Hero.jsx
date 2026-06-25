import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow hero__glow--1" />
        <span className="hero__glow hero__glow--2" />
      </div>

      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow eyebrow--light hero__eyebrow">{h.eyebrow}</span>
          <h1 className="hero__title">
            <span className="hero__title-lead">{h.titleLead}</span>
            <span className="hero__title-hl">{h.titleHighlight}</span>
          </h1>
          <p className="hero__subtitle">{h.subtitle}</p>

          <div className="hero__actions">
            <a href="#contacto" className="btn btn--gold btn--lg">
              {h.ctaPrimary}
              <Icon name="arrow" width={18} height={18} />
            </a>
            <a href="#servicos" className="btn btn--ghost btn--lg">
              {h.ctaSecondary}
            </a>
          </div>

          <ul className="hero__trust">
            {h.trust.map((item) => (
              <li key={item}>
                <Icon name="check" width={17} height={17} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__frame">
            <img src="/hero.jpg" alt="" loading="eager" />
          </div>
          <div className="hero__badge hero__badge--top">
            <strong>{h.badgeTop.value}</strong>
            <span>{h.badgeTop.label}</span>
          </div>
          <div className="hero__badge hero__badge--bottom">
            <span className="hero__badge-ic">
              <Icon name="shield" width={22} height={22} />
            </span>
            <div>
              <strong>{h.badgeBottom.value}</strong>
              <span>{h.badgeBottom.label}</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#sobre" className="hero__scroll" aria-label="Scroll">
        <span />
      </a>
    </section>
  )
}
