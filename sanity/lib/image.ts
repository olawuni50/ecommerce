import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
// import { dataset, projectId } from '../env'


// const dataset = process.env.SANITY_STUDIO_DATASET
// const projectId = process.env.SANITY_STUDIO_PROJECT_ID

const imageBuilder = createImageUrlBuilder({
  projectId: "6hxyhp1g" || '',
  dataset: "production" || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
