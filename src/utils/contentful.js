// src/utils/contentful.js
import { createClient } from 'contentful'

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
})

export async function getEntries(contentType, options = {}) {
  const response = await client.getEntries({
    content_type: contentType,
    order: '-sys.createdAt',
    ...options
  })
  return response.items
}

export async function getEntry(entryId) {
  return await client.getEntry(entryId)
}