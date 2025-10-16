import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(request: VercelRequest, response: VercelResponse) {
  response.json([
    { id: 1, title: 'Getting Started Guide', content: 'Welcome to our product...' },
    { id: 2, title: 'API Documentation', content: 'API endpoints and usage...' }
  ])
}