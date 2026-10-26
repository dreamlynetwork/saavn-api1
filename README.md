# saavn-api

Cloudflare Worker (Hono) built around `src/config.ts`. One fetch helper, one mapper file, one route file.

```bash
npm install
npm run dev        # http://localhost:8787
npm run typecheck
npm run deploy
```

Open `/` for the full route list. Every response is `{ success, data }` or `{ success: false, message }`.

## Verify before relying on it
The request parameters for these were written from memory of the unofficial API and
could not be tested (no network where this was built). If one returns empty data or a 502,
compare its query names with your browser's network tab on jiosaavn.com:

- `/api/artist/:id/top-songs` (`search.artistOtherTopSongs`)
- `/api/search/more`, `/api/radio/featured`, `/api/radio/artist`
- `/api/show/:id/episodes`, `/api/featured-playlists`, `/api/top-*`, `/api/trending`
- `/api/albums/top` (`search.topAlbumsoftheYear`), `/api/*/recommended`

Song, album, playlist, artist, search, lyrics and `/song/:id/suggestions` reuse the call
shapes from your previous worker.

JioSaavn's API is unofficial; check their terms before making a public deployment.

## Deploy on Vercel (instead of Cloudflare)
`api/index.ts` and `vercel.json` make the same app run on Vercel's Edge runtime.
Push the project root (the folder with `package.json`, `api/`, `src/`, `vercel.json`) and deploy.
Do not set a Build Command or Output Directory; leave Framework Preset as "Other".
If you still see `500 FUNCTION_INVOCATION_FAILED`, open Vercel → project → Logs and read the first red error line.
