//src/utils/getProductData.ts

// Визначення типів для параметрів та даних, що використовуються
interface Data {
    title: string;
    description: string;
}

export async function getProductData(productId: string): Promise<Data> {
    // Сюди додаємо логіку отримання даних продукту
    return { title: "Product Title", description: "Product Description" };
}
