import { useLang } from '../i18n.jsx'

export default function Platforms() {
  const { t } = useLang()
  const p = t.platforms
  return (
    <section className="platforms">
      <div className="container platforms__inner reveal">
        <span className="platforms__label">{p.label}</span>
        <ul className="platforms__list">
          {p.items.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
