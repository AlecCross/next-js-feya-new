//src/utils/getCategoryData.ts

import { sql } from "@vercel/postgres";

interface Category {
    id: string;
    name_ua: string;
    name_ru: string;
    route: string;
    image_path: string;
    image_link_original: string;
}

interface Data {
    parentCategoryId: string,
    title: string;
    description: string;
    parentCategoryRoute: string;
    subcategories: Category[]; // Додано властивість для зберігання дочірніх категорій
}

export async function getCategoryData(categoryId: string): Promise<Data> {
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
        console.log(categoryResult.rows[0].route)
        if (categoryResult.rows.length > 0) {
            const parentCategory = categoryResult.rows[0];
            const parentCategoryId = parentCategory.id;

            // Отримання даних про дочірні категорії
            const subcategoryResult = await sql`
                SELECT id,
                name_ua,
                name_ru,
                route,
                image_link_original,
                image_path
                FROM category 
                WHERE parent_id = ${parentCategoryId}
            `;
            // console.log("@!subcategoryResult ", subcategoryResult)
            const subcategories = subcategoryResult.rows.map(row => ({
                id: row.id,
                name_ua: row.name_ua,
                name_ru: row.name_ru,
                image_link_original: row.image_link_original,
                image_path: row.image_path,
                route: row.route
            }));

            const data: Data = {
                parentCategoryId: parentCategoryId,
                title: parentCategory.name_ua,
                description: parentCategory.name_ru,
                parentCategoryRoute: parentCategory.route,
                subcategories: subcategories
            };

            // console.log("getCategoryData: ",data, "subcategories ", subcategories)

            return data;
        } else {
            console.error('Category not found:', categoryId);
        }
    } catch (error) {
        console.error('Error fetching category in getCategoryData()', error);
    }
    console.log("FailFailFailFailFailFailFailFailFailFailFail")

    // Повертаємо заглушку, якщо сталася помилка або категорія не знайдена
    return {
        parentCategoryId: 'category error',
        title: "Category Title",
        description: "Category Description",
        parentCategoryRoute: "Category Description",
        subcategories: []
    };
}
