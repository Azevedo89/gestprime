import { useEffect, useState } from 'react'

export default function Preloader() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    // The loader is a fixed full-screen overlay, so it already hides the page.
    // We intentionally do NOT lock body scroll here: doing so resets the scroll
    // position to the top, which breaks restoring the user's position on reload.
    const start = () => {
      setHidden(true)
      // Remove from the DOM after the fade-out transition.
      window.setTimeout(() => setRemoved(true), 700)
    }

    // Minimum display time before the loader fades out (same on all devices).
    const minDelay = window.setTimeout(start, 2500)

    return () => window.clearTimeout(minDelay)
  }, [])

  if (removed) return null

  return (
    <div className={`preloader ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <img src="/logo-light.png" alt="GestPrime" className="preloader__logo" />
        <div className="preloader__bar">
          <span />
        </div>
      </div>
    </div>
  )
}
