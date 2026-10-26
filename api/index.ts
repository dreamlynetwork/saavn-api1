import { handle } from '@hono/node-server/vercel'
import app from '../src/index.js'

// FIX: this function now runs on Vercel's Node.js runtime (the default),
// NOT the Edge runtime. `node-forge` (used in src/saavn.ts to decrypt
// download links) needs Node's `crypto`, which Edge does not support.
export const config = {
  api: {
    bodyParser: false
  }
}

export default handle(app)
