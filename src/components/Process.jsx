import { useLang } from '../i18n.jsx'

export default function Process() {
  const { t } = useLang()
  const p = t.process
  return (
    <section className="section" id="processo">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="section__title">{p.title}</h2>
        </div>

        <div className="steps">
          {p.steps.map((step, i) => (
            <div className="step reveal" style={{ '--d': `${i * 80}ms` }} key={step.n}>
              <div className="step__n">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
