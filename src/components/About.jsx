import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section className="section" id="sobre">
      <div className="container about">
        <div className="about__text reveal">
          <span className="eyebrow">{a.eyebrow}</span>
          <h2 className="section__title">{a.title}</h2>
          {a.paragraphs.map((p, i) => (
            <p className="lead" key={i}>
              {p}
            </p>
          ))}
          <ul className="ticks">
            {a.points.map((p) => (
              <li key={p}>
                <Icon name="check" width={20} height={20} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="about__media reveal">
          <div className="about__card">
            <img src="/logo-transparent.png" alt="GestPrime" />
            <div className="about__card-line" />
            <p>Property &amp; AL Management · Lisboa</p>
          </div>
        </div>
      </div>
    </section>
  )
}
