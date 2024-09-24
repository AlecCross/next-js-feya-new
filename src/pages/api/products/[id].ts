// pages/api/products/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  if (req.method === 'GET') {
    // Отримати інформацію про товар
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id as string, 10) },
      });
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Error fetching product' });
    }
  } else if (req.method === 'PUT') {
    // Оновити інформацію про товар
    const { vendor_code, name_ua, name_ru, description_ua, description_ru, image_link, product_category_id } = req.body;

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id as string, 10) },
        data: {
          vendor_code,
          name_ua,
          name_ru,
          description_ua,
          description_ru,
          image_link,
          product_category_id: product_category_id || null,
        },
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Error updating product' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
