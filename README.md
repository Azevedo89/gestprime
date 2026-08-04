# GestPrime | Website

Website institucional da **GestPrime** (gestão imobiliária e Alojamento Local, Lisboa).
Construído com **React + Vite**, bilingue (PT/EN), de página única, publicado via **GitHub Pages**
com domínio próprio `gestprime.online`.

## Desenvolvimento

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # gerar versão de produção em /dist
npm run preview  # pré-visualizar a build de produção
```

Requer Node 18+ (o deploy usa Node 20).

## Estrutura

```
public/               logótipos, favicon, imagens, CNAME
  logo.png              logótipo original (também usado no Open Graph)
  logo-transparent.png  logótipo p/ fundos claros (navbar branca)
  logo-light.png        logótipo p/ fundos escuros (navbar sobre o hero, footer, menu)
  hero.jpg              imagem do hero
  feature-1.jpg         imagem da secção "Marketing & Posicionamento"
  feature-2.jpg         imagem da secção "Gestão Financeira & Relatórios"
  CNAME                 domínio do GitHub Pages (gestprime.online)
src/
  data/content.js     TODO o texto do site (PT + EN), dados de contacto e textos legais
  i18n.jsx            contexto de idioma PT/EN (deteta o idioma do browser, guarda a escolha)
  App.jsx             composição das secções, reveal on scroll, volta ao topo no reload
  styles.css          tema visual (navy + dourado) e responsividade
  components/
    Preloader.jsx       ecrã de carregamento inicial
    Navbar.jsx          navbar fixa, scroll spy, seletor de idioma, menu hamburger (mobile)
    Hero.jsx            secção principal (texto + imagem com etiquetas)
    Platforms.jsx       faixa de plataformas (Airbnb, Booking.com, Idealista)
    About.jsx           Sobre Nós
    Services.jsx        cartões de serviços
    Process.jsx         "Como Trabalhamos" (4 passos)
    Features.jsx        destaques com fotografias
    Faq.jsx             perguntas frequentes (acordeão)
    CTA.jsx             faixa de chamada para ação
    Contact.jsx         contactos + formulário + mapa
    Footer.jsx          rodapé + links legais
    CookieBanner.jsx    banner de cookies
    LegalModal.jsx      Política de Privacidade e Termos de Serviço (modal)
    FloatingButtons.jsx botões flutuantes de WhatsApp e "voltar ao topo"
    Icons.jsx           ícones SVG inline
```

## Funcionalidades

- **Bilingue PT/EN** com seletor no topo (deteta o idioma do browser e guarda a preferência).
- **Pré-loader** inicial (duração configurável em [`src/components/Preloader.jsx`](src/components/Preloader.jsx)).
- **Navbar** fixa com indicador da secção ativa (scroll spy) e **menu hamburger de ecrã inteiro** em mobile/tablet.
- **Animações de entrada** ao fazer scroll (com proteção: se o JavaScript falhar, o conteúdo aparece na mesma).
- Ao **recarregar**, a página volta sempre ao topo (hero), em mobile e desktop.
- **Formulário** que envia diretamente por email (ver secção abaixo).
- **Política de Privacidade** e **Termos de Serviço** em modal (abertos pelo rodapé), bilingues.
- **Banner de cookies**, **botão de WhatsApp** e **voltar ao topo**.
- Totalmente **responsivo** (telemóveis, tablets/iPads, portáteis e monitores grandes).

## Editar conteúdos

- **Textos, serviços, FAQ, contactos e textos legais**: [`src/data/content.js`](src/data/content.js).
  Há um bloco `pt` e um bloco `en`. Os dados partilhados (telefones, email, Instagram, morada do mapa)
  estão no objeto `CONTACT` no fim do ficheiro.
- **Imagens**: substituir os ficheiros em `public/` (`hero.jpg`, `feature-1.jpg`, `feature-2.jpg`),
  mantendo os mesmos nomes.
- **Logótipos**: `public/logo-light.png` (fundos escuros) e `public/logo-transparent.png` (fundos claros).
- **Cores e tipografia**: variáveis `--navy`, `--gold`, etc. no topo de [`src/styles.css`](src/styles.css).
- **Duração do pré-loader**: valor em milissegundos em [`src/components/Preloader.jsx`](src/components/Preloader.jsx).

## Formulário de contacto (FormSubmit)

O formulário valida os campos obrigatórios (**nome**, **e-mail válido**, **mensagem**), tem um
campo *honeypot* (`_honey`) anti-spam, e **envia diretamente** (sem backend) através do
[FormSubmit](https://formsubmit.co) via `POST` no endpoint AJAX `https://formsubmit.co/ajax/<email>`,
onde `<email>` é o `CONTACT.email` de [`src/data/content.js`](src/data/content.js).
A página mostra a confirmação de sucesso sem recarregar.

### Ativação (uma única vez)
O FormSubmit exige uma confirmação inicial:

1. Na **primeira** submissão, é enviado um email com o link **"Activate Form"** para o email de destino
   (`geral@gestprime.online`). Verificar também a pasta de spam.
2. Clicar em **"Activate Form"** nesse email.
3. A partir daí, todas as mensagens chegam diretamente a essa caixa.

> Para trocar o email de destino, alterar `email` no objeto `CONTACT`
> ([`src/data/content.js`](src/data/content.js)). A próxima submissão volta a pedir ativação
> para o novo endereço.

## Publicar no GitHub Pages

1. Fazer push deste projeto para o branch **`main`** (o workflow corre em `main`).
2. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz build e deploy
   automaticamente em cada push para `main`.

### Domínio próprio (gestprime.online)
- O ficheiro [`public/CNAME`](public/CNAME) já contém `gestprime.online`, e o `base` em
  [`vite.config.js`](vite.config.js) está `'/'` (correto para domínio na raiz). Não é preciso mexer.
- No fornecedor de DNS, apontar o domínio para o GitHub Pages:
  - 4 registos `A` no apex: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - (opcional, IPv6) registos `AAAA`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - (opcional, `www`) um `CNAME` de `www` para `<utilizador>.github.io`
- Em **Settings → Pages → Custom domain**, confirmar `gestprime.online` e ativar **Enforce HTTPS**.

> Se algum dia for publicado numa subpasta (`utilizador.github.io/GestPrime`) em vez de domínio próprio,
> mudar `base` em [`vite.config.js`](vite.config.js) para `'/GestPrime/'` e remover o CNAME.
