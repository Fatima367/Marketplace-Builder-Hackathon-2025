import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_KEY,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
