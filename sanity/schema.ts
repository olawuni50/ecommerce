import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import shop from './shop'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, shop, order],
}
