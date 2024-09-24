import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { vendor_code, name_ua, name_ru, description_ua, description_ru, image_link, product_category_id } = req.body;
      
      const newProduct = await prisma.product.create({
        data: {
          vendor_code,
          name_ua,
          name_ru,
          description_ua,
          description_ru,
          image_link,
          product_category_id,
        },
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
