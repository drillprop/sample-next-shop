import { NextApiRequest, NextApiResponse } from 'next';
import { product } from '../../../../models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await product.findMany();
  res.json(products);
};
