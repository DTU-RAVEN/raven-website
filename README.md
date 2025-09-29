## RAVEN Website

Vite + React + TypeScript site.

### Local development

```sh
npm i
npm run dev
```

### Build

```sh
npm run build
```

### Deploy with Dokploy

This repo includes a production Docker image for Nginx serving the Vite build.

1) Create an app in Dokploy (type: Dockerfile)
- Docker context: repository root
- Dockerfile path: `Dockerfile`

2) Environment variables
- Optional: `PORT=8080` (container listens on 80 by default; Dokploy will expose via your domain)

3) Auto-deploy
- Pushes to your branch build a new image in Dokploy if you enable Auto Deploy in the app General tab
- Or set up CI to push to a registry and point Dokploy at that image

4) Custom domain
- Attach a domain in Dokploy and enable HTTPS

#### Manual run (optional)

```sh
docker build -t raven-website .
docker run --rm -p 8080:80 raven-website
```
