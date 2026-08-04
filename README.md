# GestPrime | Website

Marketing website for **GestPrime** (property and short-term rental management, Lisbon).
Built with **React + Vite**, bilingual (PT/EN), single page, deployed via **GitHub Pages**
with the custom domain `gestprime.online`.

## Development

```bash
npm install      # install dependencies
npm run dev      # dev server (http://localhost:5173)
npm run build    # production build in /dist
npm run preview  # preview the production build
```

Requires Node 18+ (the deploy uses Node 20).

## Structure

```
public/               logos, favicon, images, CNAME
  logo.png              original logo (also used for Open Graph)
  logo-transparent.png  logo for light backgrounds (solid navbar)
  logo-light.png        logo for dark backgrounds (navbar over hero, footer, menu)
  hero.jpg              hero image
  feature-1.jpg         "Marketing & Positioning" section image
  feature-2.jpg         "Financial Management & Reporting" section image
  CNAME                 GitHub Pages custom domain (gestprime.online)
src/
  data/content.js     ALL site copy (PT + EN), contact details and legal text
  i18n.jsx            PT/EN language context (detects the browser language, stores the choice)
  App.jsx             section composition, reveal on scroll, scroll to top on reload
  styles.css          visual theme (navy + gold) and responsiveness
  components/
    Preloader.jsx       initial loading screen
    Navbar.jsx          fixed navbar, scroll spy, language switch, hamburger menu (mobile)
    Hero.jsx            main section (text + image with badges)
    Platforms.jsx       platforms strip (Airbnb, Booking.com, Idealista)
    About.jsx           About Us
    Services.jsx        service cards
    Process.jsx         "How We Work" (4 steps)
    Features.jsx        highlights with photos
    Faq.jsx             frequently asked questions (accordion)
    CTA.jsx             call-to-action band
    Contact.jsx         contact details + form + map
    Footer.jsx          footer + legal links
    CookieBanner.jsx    cookie banner
    LegalModal.jsx      Privacy Policy and Terms of Service (modal)
    FloatingButtons.jsx floating WhatsApp and "back to top" buttons
    Icons.jsx           inline SVG icons
index.html            page shell, meta/SEO tags and the Google tag (gtag.js)
```

## Features

- **Bilingual PT/EN** with a switch in the navbar (detects the browser language and stores the preference).
- **Preloader** on load (duration configurable in [`src/components/Preloader.jsx`](src/components/Preloader.jsx)).
- **Fixed navbar** with an active-section indicator (scroll spy) and a **full-screen hamburger menu** on mobile/tablet.
- **Reveal-on-scroll** animations (with a safeguard: if JavaScript fails, the content still shows).
- On **reload**, the page always returns to the top (hero), on mobile and desktop.
- **Contact form** that sends email directly (see the section below).
- **Privacy Policy** and **Terms of Service** in a modal (opened from the footer), bilingual.
- **Cookie banner**, **WhatsApp button** and **back-to-top** button.
- Fully **responsive** (phones, tablets/iPads, laptops and large monitors).
- **Google tag (gtag.js)** installed for Google Ads / Analytics, with a conversion fired on a successful form submission.

## Editing content

- **Copy, services, FAQ, contact details and legal text**: [`src/data/content.js`](src/data/content.js).
  There is a `pt` block and an `en` block. Shared data (phone numbers, email, Instagram, map address)
  lives in the `CONTACT` object at the end of the file.
- **Images**: replace the files in `public/` (`hero.jpg`, `feature-1.jpg`, `feature-2.jpg`),
  keeping the same file names.
- **Logos**: `public/logo-light.png` (dark backgrounds) and `public/logo-transparent.png` (light backgrounds).
- **Colors and typography**: `--navy`, `--gold`, etc. variables at the top of [`src/styles.css`](src/styles.css).
- **Preloader duration**: value in milliseconds in [`src/components/Preloader.jsx`](src/components/Preloader.jsx).

## Contact form (FormSubmit)

The form validates the required fields (**name**, **valid email**, **message**), has a
`_honey` spam *honeypot*, and **sends directly** (no backend) through
[FormSubmit](https://formsubmit.co) via a `POST` to the AJAX endpoint
`https://formsubmit.co/ajax/<email>`, where `<email>` is `CONTACT.email` in
[`src/data/content.js`](src/data/content.js). The page shows a success message without reloading.

### Activation (one time, per domain)
FormSubmit requires an initial confirmation:

1. On the **first** submission from a given domain, an email with an **"Activate Form"** link is sent to the
   destination address (`geral@gestprime.online`). Check the spam folder too.
2. Click **"Activate Form"** in that email.
3. From then on, every message arrives directly in that inbox.

> FormSubmit tracks activation **per referring domain**, so the live domain
> (`gestprime.online`) needs its own one-time activation, separate from `localhost`.
> To change the destination address, edit `email` in the `CONTACT` object
> ([`src/data/content.js`](src/data/content.js)); the next submission asks for activation again.

## Google Ads / Analytics

The base **Google tag** (`gtag.js`, ID `AW-18280831262`) is in the `<head>` of
[`index.html`](index.html), so it loads on every page.

Because the form submits via AJAX (`preventDefault`), Google's automatic form detection
cannot count it. The conversion is therefore fired **manually** on a successful submission,
in [`src/components/Contact.jsx`](src/components/Contact.jsx):

```js
window.gtag('event', 'conversion', { send_to: CONTACT.adsConversionSendTo })
```

To enable it, set `adsConversionSendTo` in the `CONTACT` object
([`src/data/content.js`](src/data/content.js)) to `'AW-18280831262/<LABEL>'`, where `<LABEL>`
is the conversion label from Google Ads (switch the conversion action to "manual tag
installation" to obtain it). While empty, no conversion is fired.

## Deploying to GitHub Pages

1. Push this project to the **`main`** branch (the workflow runs on `main`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) workflow builds and
   deploys automatically on every push to `main`.

### Custom domain (gestprime.online)
- [`public/CNAME`](public/CNAME) already contains `gestprime.online`, and `base` in
  [`vite.config.js`](vite.config.js) is `'/'` (correct for a root domain). No change needed.
- At your DNS provider, point the domain to GitHub Pages:
  - 4 apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - (optional, IPv6) `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - (optional, `www`) a `CNAME` record for `www` pointing to `<username>.github.io`
- Under **Settings → Pages → Custom domain**, confirm `gestprime.online` and enable **Enforce HTTPS**.

> If it is ever published under a subpath (`username.github.io/GestPrime`) instead of a custom domain,
> change `base` in [`vite.config.js`](vite.config.js) to `'/GestPrime/'` and remove the CNAME.
