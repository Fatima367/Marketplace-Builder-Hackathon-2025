import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default function SearchResults(debouncedQuery?: string){
  return client.fetch(
    groq`*[
  _type == "car"
]{
  _id,
  name,
  rentPerDay,
  originalPrice,
  capacity,
  mode,
  fuel,
  category,
  slug,
  image {
    asset -> {
      _id,
      url
    }
  },
  _createdAt,
  _updatedAt
}`
  )
}

