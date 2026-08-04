import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { CONTACT } from '../data/content.js'
import Icon from './Icons.jsx'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: bots fill hidden fields, so silently treat as success.
    if (data.get('_honey')) {
      setStatus('success')
      return
    }

    // Required-field validation before sending.
    const name = (data.get('name') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const phone = (data.get('phone') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()
    if (!name || !emailOk(email) || !message) {
      setStatus('invalid')
      return
    }

    // Send directly through FormSubmit (no backend needed on GitHub Pages).
    // The AJAX endpoint returns JSON, so the page never navigates away.
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '(não indicado)',
          message,
          _subject: c.form.subject,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && String(json.success) === 'true') {
        // Report the Google Ads conversion. The form submits via AJAX (preventDefault),
        // so Google's automatic form detection can't count it; we fire it manually here.
        if (CONTACT.adsConversionSendTo && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: CONTACT.adsConversionSendTo })
        }
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contacto">
      <div className="container contact">
        <div className="contact__info reveal">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="section__title">{c.title}</h2>
          <p className="lead">{c.subtitle}</p>

          <ul className="contact__list">
            <li>
              <span className="contact__ic"><Icon name="pin" width={22} height={22} /></span>
              <div>
                <strong>{c.addressLabel}</strong>
                {c.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </li>
            <li>
              <span className="contact__ic"><Icon name="phone" width={22} height={22} /></span>
              <div>
                <strong>{c.phoneLabel}</strong>
                {CONTACT.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                ))}
              </div>
            </li>
            <li>
              <span className="contact__ic"><Icon name="mail" width={22} height={22} /></span>
              <div>
                <strong>{c.emailLabel}</strong>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </li>
          </ul>

          <div className="contact__socials">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" width={22} height={22} />
            </a>
            <a
              href={`https://wa.me/${CONTACT.phonePrimaryE164.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <Icon name="whatsapp" width={22} height={22} />
            </a>
          </div>
        </div>

        <div className="contact__form-wrap reveal">
          {status === 'success' ? (
            <div className="form-success">
              <Icon name="check" width={40} height={40} />
              <p>{c.form.success}</p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit} noValidate>
              {/* Spam honeypot: hidden from users; if filled, the submit is ignored. */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="form__hp"
              />
              <div className="form__row">
                <label>
                  {c.form.name} <span className="form__req">*</span>
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label>
                  {c.form.email} <span className="form__req">*</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
              <label>
                {c.form.phone}
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                {c.form.message} <span className="form__req">*</span>
                <textarea name="message" rows="5" required placeholder={c.form.messagePlaceholder} />
              </label>
              {status === 'invalid' && <p className="form-error">{c.form.invalid}</p>}
              {status === 'error' && <p className="form-error">{c.form.error}</p>}
              <button type="submit" className="btn btn--gold btn--lg btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? c.form.sending : c.form.send}
                {status !== 'sending' && <Icon name="arrow" width={18} height={18} />}
              </button>
              <p className="form__consent">{c.form.consent}</p>
            </form>
          )}
        </div>
      </div>

      <div className="container">
        <div className="map reveal">
          <iframe
            title="GestPrime em Lisboa"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
