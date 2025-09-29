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

### Deploy with Dokploy (Git + Nixpacks)

Follow Dokploy's Vite React example:

1) Create an Application in Dokploy using your Git repo
- Repository: your Git URL
- Branch: main (or your branch)
- Build path: `/` (repo root)
- Publish directory: `./dist` (Nixpacks)

2) Deploy
- Click Deploy to build and publish

3) Domain
- Click Generate Domain
- Set Port `80`
- Open the generated URL

Reference: [Dokploy Vite React guide](https://docs.dokploy.com/docs/core/vite-react)

### Optional: Docker deployment
If you prefer Docker, keep a `Dockerfile` that builds the Vite project and serves it with Nginx, then deploy the image in Dokploy.
