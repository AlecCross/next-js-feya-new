//src/utils/getCategoryData.ts

import { sql } from "@vercel/postgres";

interface Data {
    title: string;
    description: string;
}

export async function getCategoryData(categoryId: string): Promise<Data> {
    try {
        const result = await sql`
            SELECT id,
            name_ua,
            name_ru,
            route 
            FROM category 
            WHERE route = ${categoryId}
        `;

        if (result.rows.length > 0) {
            const row = result.rows[0]; // Отримуємо перший рядок результату
            const data: Data = {
                title: row.name_ua, // Використовуємо name_ua як заголовок
                description: row.name_ru // Використовуємо name_ru як опис
            };

            return data; // Повертаємо об'єкт Data з отриманими даними
        } else {
            console.error('Category not found:', categoryId);
        }
    } catch (error) {
        console.error('Error fetching category in getCategoryData()', error);
    }

    // Повертаємо заглушку, якщо сталася помилка або категорія не знайдена
    return { title: "Category Title", description: "Category Description" };
}

