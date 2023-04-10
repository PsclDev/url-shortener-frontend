# 🔗 URL Shortener
This is a project for me to just check out some new stuff like svelte, zod, prisma, github app login and a bit complexer caddy config.

Some things might been easier to approach but well my way also works so out.

| Dashboard | Edit Modal |
| ----- | ----- |
| ![](https://url-shortener.pscl.dev/dashboard.png) | ![](https://url-shortener.pscl.dev/modal.png) |2

## Development 
### Tech Stack
The backend is written with NestJs, Zod, Prisma and uses postgres as a database. Frontend is based on vite and sveltekit.

### Requirements
The listed versions are not strictly needed, but I used that to the time.

- `Node v16 or later`
- `tsc v4.9.5`
- `pnpm v7.30`
- `Postgres`

### Getting started
In both frontend and backend repos are .env file examples which can be copied and filled in with your values, also dont forget to edit the envs inside docker-compose file.

### CI
Dont forget to change the image names in the github actions and also set the SECRET which is used to login to ghcr

## Caddy Confgiruation
My caddy file looks like this, the frontend and backend is accessed via a reverse proxy and listening on a subdomain. The domain listens then to all requests and rewrites them to the backend to get redirected

```
url.domain.tld {
        handle /api/* {
                uri replace /api /v1
                reverse_proxy localhost:3010
        }

        handle {
                reverse_proxy localhost:3000
        }
}

domain.tld/* {
        reverse_proxy localhost:3010 {
                header_up Host {host}   
        }
        rewrite * /v1/link/redirect{uri}
}
```

## Shoutout
The favicon was <a href="https://www.flaticon.com/free-icons/link">created by Freepik - Flaticon</a>