import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import Icon from './Icons.jsx'

export default function Faq() {
  const { t } = useLang()
  const f = t.faq
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="section__head reveal">
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 className="section__title">{f.title}</h2>
        </div>

        <div className="faq__list reveal">
          {f.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button
                  className="faq__q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq__plus">
                    <Icon name={isOpen ? 'minus' : 'plus'} width={20} height={20} />
                  </span>
                </button>
                <div className="faq__a">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
