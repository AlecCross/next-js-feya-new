//src/utils/getCategoryData.ts

import { sql } from "@vercel/postgres";

interface Product {
    id: number,
    vendor_code: string,
    name_ua: string,
    name_ru: string,
    description_ua: string,
    description_ru: string,
    image_path: string,
    image_link: string,
    product_category_id: string,
}

export async function getProducts(categoryId: string): Promise<Product[]> {
    try {
        // Отримуємо дані про батьківську категорію
        const categoryResult = await sql`
            SELECT id,
            name_ua,
            name_ru,
            route 
            FROM category 
            WHERE route = ${categoryId}
        `;
        if (categoryResult.rows.length > 0) {
            const parentCategory = categoryResult.rows[0];
            const parentCategoryId = parentCategory.id;
            console.log("parentCategoryId ", parentCategoryId)
            const products1 = await sql`
                SELECT * FROM product WHERE product_category_id  = ${parentCategoryId}
            `;
            const products: Product[] = products1.rows.map(row => ({
                id: row.id,
                vendor_code: row.vendor_code,
                name_ua: row.name_ua,
                name_ru: row.name_ru,
                description_ua: row.description_ua,
                description_ru: row.description_ru,
                image_path: row.image_path,
                image_link: row.image_link,
                product_category_id: row.product_category_id,
            }));
            console.log("products &&&&&&&", products)
            return products ; // Повертаємо об'єкт Products, який містить масив продуктів
        } else {
            console.error('Category not found:', categoryId);
        }
    } catch (error) {
        console.error('Error fetching category in getCategoryData()', error);
    }
    console.log("FailSubcategoryPage")
    // Повертаємо заглушку, якщо сталася помилка або категорія не знайдена
    return [];
}

