import { NextApiRequest, NextApiResponse } from 'next';
import { product } from '../../../../models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, category, priceCents } = req.body;
  const newProduct = await product.create({
    data: {
      name,
      category,
      priceCents,
    },
  });
  res.json({ product: newProduct });
};
