import { preview } from 'vite'

const server = await preview({
  preview: {
    port: 4173,
    host: true
  }
})

console.log(`Server running at ${server.resolvedUrls.local[0]}`)
