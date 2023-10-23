// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchQuery } from '@/libs/api';
import client from '@/libs/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const {id}:any = req.query;

   const shopQuery: any = searchQuery(id);

   const shops = await client.fetch(shopQuery)

   res.status(200).json(shops)
    }
}
