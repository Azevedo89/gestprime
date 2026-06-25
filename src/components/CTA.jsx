import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function CTA() {
  const { t } = useLang()
  return (
    <section className="cta-band">
      <div className="container cta-band__inner reveal">
        <div>
          <h2>{t.cta.title}</h2>
          <p>{t.cta.text}</p>
        </div>
        <a href="#contacto" className="btn btn--gold btn--lg">
          {t.cta.button}
          <Icon name="arrow" width={18} height={18} />
        </a>
      </div>
    </section>
  )
}
