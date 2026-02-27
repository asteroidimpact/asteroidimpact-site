# asteroidimpact-site

Public-facing website for [Asteroid Impact](https://github.com/asteroidimpact/ai_crystal_diss) — a WebGL game platform for studying attention, reward, and cognitive control in mediated environments.

## Structure

- `/` — Landing page
- `/play` — Embeds the demo WebGL build (uses `?mode=demo` URL parameter to activate neutral settings with no data collection)
- `/docs/overview` — What Asteroid Impact is
- `/docs/gameplay` — In-game elements reference
- `/docs/configuration` — RoundPrefsSO field reference
- `/docs/data-logging` — Supabase tables, schemas, and security setup
- `/docs/research` — How to set up your own study
- `/docs/publications` — Citation and studies using the tool

## Development

```bash
npm install
npm run dev
```

## Deployment

The site is deployed to [Vercel](https://vercel.com) and served at `asteroidimpact.dev`. Pushes to `main` trigger automatic deployment.

## Contributing documentation

All documentation lives in `src/content/docs/docs/` as Markdown files. Edit them directly and open a pull request.
