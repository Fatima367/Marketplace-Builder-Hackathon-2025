import { type SchemaTypeDefinition } from 'sanity'
import { car } from '../cars'
import reviews from '../reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, reviews],
}
