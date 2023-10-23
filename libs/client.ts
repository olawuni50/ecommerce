import SanityClient from 'next-sanity-client';

const client = new SanityClient({
  // projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID as string,
  // dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET as string,
  // useCdn: false
  projectId: '6hxyhp1g',
  dataset: 'production',
  useCdn: false
});

export default client