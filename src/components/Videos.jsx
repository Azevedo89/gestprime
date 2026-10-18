import { useLang } from '../i18n.jsx'

export default function Videos() {
  const { t } = useLang()
  const v = t.videos
  return (
    <section className="section videos-section" id="videos">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--light">{v.eyebrow}</span>
          <h2 className="section__title">{v.title}</h2>
        </div>
        <div className="videos reveal">
          {[1, 2].map((n) => (
            <video
              key={n}
              className="videos__item"
              controls
              playsInline
              preload="none"
              poster={`/video-${n}-poster.jpg`}
            >
              <source src={`/video-${n}.mp4`} type="video/mp4" />
            </video>
          ))}
        </div>
      </div>
    </section>
  )
}
