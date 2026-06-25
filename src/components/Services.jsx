import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function Services() {
  const { t } = useLang()
  const s = t.services
  return (
    <section className="section section--alt" id="servicos">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="section__title">{s.title}</h2>
          <p className="section__subtitle">{s.subtitle}</p>
        </div>

        <div className="grid grid--3">
          {s.items.map((item, i) => (
            <article className="card reveal" style={{ '--d': `${i * 60}ms` }} key={item.title}>
              <div className="card__icon">
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
