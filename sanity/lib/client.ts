import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId, useCdn } from '../env'

const apiVersion = process.env.SANITY_STUDIO_API_VERSION
const dataset = process.env.SANITY_STUDIO_DATASET
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const useCdn = false

export const client = createClient({
  apiVersion,
  dataset:"production",
  projectId:"6hxyhp1g",
  useCdn,
})
