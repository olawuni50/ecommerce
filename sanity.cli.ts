/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const dataset = process.env.SANITY_STUDIO_DATASET 
const projectId = process.env.SANITY_STUDIO_PROJECT_ID 

export default defineCliConfig({ api: { projectId, dataset } })
