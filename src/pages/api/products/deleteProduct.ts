// pages/api/products/deleteProduct.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return res.status(200).json(deletedProduct);
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Error deleting product' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
