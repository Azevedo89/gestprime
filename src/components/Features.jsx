import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function Features() {
  const { t } = useLang()
  return (
    <section className="section section--alt">
      <div className="container features">
        {t.features.map((f, i) => (
          <div className={`feature ${i % 2 ? 'feature--reverse' : ''} reveal`} key={i}>
            <div className="feature__text">
              <span className="eyebrow">{f.eyebrow}</span>
              <h2 className="section__title">{f.title}</h2>
              <p className="lead">{f.text}</p>
              <ul className="ticks">
                {f.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" width={20} height={20} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature__visual" aria-hidden="true">
              <div className="feature__panel">
                <img src={`/feature-${i + 1}.jpg`} alt="" loading="lazy" />
                <span className="feature__index">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
