# GestPrime | Website

Website institucional da **GestPrime** (gestão imobiliária e Alojamento Local, Lisboa).
Construído com **React + Vite**, bilingue (PT/EN), publicado via **GitHub Pages**.

## Desenvolvimento

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # gerar versão de produção em /dist
npm run preview  # pré-visualizar a build de produção
```

## Estrutura

```
public/            logótipos, favicon, CNAME
src/
  data/content.js  TODO o texto do site (PT + EN) e dados de contacto
  i18n.jsx         seletor de idioma PT/EN
  components/      Preloader, Navbar, Hero, Platforms, About, Services, Process,
                   Features, Faq, CTA, Contact, Footer, Cookies, FloatingButtons
  styles.css       tema visual (navy + dourado)
```

### Formulário: parâmetros e proteção
O formulário valida os campos obrigatórios (**nome**, **e-mail válido**, **mensagem**) antes
de enviar e inclui um campo *honeypot* (`_honey`) anti-spam. Envia diretamente (sem backend)
através do [FormSubmit](https://formsubmit.co) para o e-mail em `CONTACT.email`
([`src/data/content.js`](src/data/content.js)), via `POST` no endpoint AJAX
`https://formsubmit.co/ajax/<email>`. A página mostra a mensagem de sucesso sem recarregar.

### Editar textos
Quase tudo o que precisas de mudar está em [`src/data/content.js`](src/data/content.js):
títulos, descrições, serviços, contactos. Há um bloco `pt` e um bloco `en`.

## ⚠️ Formulário de contacto (FormSubmit) — ativação única

O formulário usa o [FormSubmit](https://formsubmit.co) (gratuito, sem registo).
**É preciso ativar uma única vez:**

1. Na **primeira** submissão, o FormSubmit envia um email com o link **"Activate Form"**
   para `geral@gestprime.online`.
2. Abre esse email e clica em **"Activate Form"**.
3. A partir daí, todas as mensagens do formulário chegam diretamente a `geral@gestprime.online`.

> Para trocar o e-mail de destino, muda `email` em `CONTACT` ([`src/data/content.js`](src/data/content.js))
> (a próxima submissão volta a pedir ativação para o novo endereço).

## Publicar no GitHub Pages

1. Cria um repositório no GitHub e faz push deste projeto para o branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz build e deploy automaticamente em cada push.

### Domínio próprio (gestprime.online)
- O ficheiro [`public/CNAME`](public/CNAME) já contém `gestprime.online`.
- No teu fornecedor de DNS, aponta o domínio para o GitHub Pages:
  - 4 registos `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - (e/ou) um `CNAME` de `www` para `<utilizador>.github.io`
- Em **Settings → Pages → Custom domain**, confirma `gestprime.online` e ativa **Enforce HTTPS**.

> Se algum dia publicares numa subpasta (`utilizador.github.io/GestPrime`) em vez de domínio próprio,
> muda `base` em [`vite.config.js`](vite.config.js) para `'/GestPrime/'` e remove o CNAME.
