import { useEffect, useLayoutEffect, useState } from 'react'
import { useLang } from './i18n.jsx'
import Preloader from './components/Preloader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Platforms from './components/Platforms.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Features from './components/Features.jsx'
import Faq from './components/Faq.jsx'
import CTA from './components/CTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import LegalModal from './components/LegalModal.jsx'

export default function App() {
  const [legal, setLegal] = useState(null) // 'privacy' | 'terms' | null
  const { lang } = useLang()

  // Always start at the top (hero) on load/reload, on mobile and desktop. We take
  // over from the browser's scroll restoration so a reload never lands mid-page.
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  // Reveal-on-scroll. Scroll-position based (not IntersectionObserver) so that
  // sections the user skips past (anchor links, fast scrolling, or the browser
  // restoring the scroll position on reload) are still revealed and never left blank.
  // Re-runs on `lang` change: switching language remounts some elements, which would
  // otherwise lose their revealed state and disappear until scrolled again.
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll('.reveal'))
    if (!pending.length) return

    const reveal = () => {
      const vh = window.innerHeight
      pending = pending.filter((el) => {
        // Reveal once the element's top is within (or already above) the viewport.
        if (el.getBoundingClientRect().top < vh * 0.9) {
          el.classList.add('is-visible')
          return false
        }
        return true
      })
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        reveal()
        ticking = false
      })
    }

    reveal() // reveal whatever is already in/above the viewport on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Safety net: re-check after full load, when images/fonts may have shifted layout.
    window.addEventListener('load', reveal)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', reveal)
    }
  }, [lang])

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Platforms />
        <About />
        <Services />
        <Process />
        <Features />
        <Faq />
        <CTA />
        <Contact />
      </main>
      <Footer onLegal={setLegal} />
      <CookieBanner />
      <FloatingButtons />
      <LegalModal doc={legal} onClose={() => setLegal(null)} />
    </>
  )
}
