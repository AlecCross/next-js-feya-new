//src/utils/getProductData.ts

import { sql } from "@vercel/postgres";
// Визначення типів для параметрів та даних, що використовуються

interface ProductData {
    product_category_id: number,
    id: number,
    name_ua: string,
    name_ru: string,
    description_ua: string,
    description_ru: string,
    image_path: string,
    image_link: string,
    vendor_code: string,
}

export async function getProductData(productId: string): Promise<ProductData> {
    try {
        const productResult = await sql`
            SELECT 
                product_category_id,
                id,
                name_ua,
                name_ru,
                description_ua,
                description_ru,
                image_path,
                image_link,
                vendor_code
            FROM 
                product 
            WHERE 
                id = ${productId}`;
            console.log("productResult ************", productResult)
        if (productResult.rows.length > 0) {
            const productData = productResult.rows[0];
            return {
                product_category_id: productData.product_category_id,
                id: productData.id,
                name_ua: productData.name_ua,
                name_ru: productData.name_ru,
                description_ua: productData.description_ua,
                description_ru: productData.description_ru,
                image_path: productData.image_path,
                image_link: productData.image_link,
                vendor_code: productData.vendor_code,
            };
        } else {
            throw new Error(`Product with ID ${productId} not found`);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}

