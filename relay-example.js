// Optional relay. Deploy on any host with an Indian IP (VPS, Render/Railway India region, etc.),
// then set SAAVN_BASE_URL=https://<your-relay>/api.php on Vercel.
// NOTE: Cloudflare Workers do NOT let you choose the country, so they usually won't fix a geo block.
export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname !== '/api.php') return new Response('not found', { status: 404 })
    const upstream = new URL('https://www.jiosaavn.com/api.php')
    upstream.search = url.search
    const res = await fetch(upstream, {
      headers: { Accept: 'application/json', 'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0' }
    })
    return new Response(res.body, { status: res.status, headers: { 'Content-Type': 'application/json' } })
  }
}
