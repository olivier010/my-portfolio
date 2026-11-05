// src/utils/contentful.js
import { createClient } from 'contentful'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const client = spaceId && accessToken
  ? createClient({
      space: spaceId,
      accessToken,
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
    })
  : null

export async function getEntries(contentType, options = {}) {
  if (!client) {
    console.warn('Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.')
    return []
  }
  const response = await client.getEntries({
    content_type: contentType,
    order: '-sys.createdAt',
    ...options
  })
  return response.items || []
}

export async function getEntry(entryId) {
  if (!client) {
    console.warn('Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.')
    return null
  }
  return await client.getEntry(entryId)
}
