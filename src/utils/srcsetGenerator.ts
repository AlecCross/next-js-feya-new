//src/utils/srcsetGenerator.ts

interface Image {
    path: string;
    resolution: number;
}

export function generateSrcSet(images: Image[] = []): string {
    // Створюємо рядок для зберігання значень srcset
    let srcSet = '';

    // Проходимося по кожному зображенню
    images.forEach(image => {
        // Додаємо шлях та роздільну здатність до srcset
        srcSet += `${image.path} ${image.resolution}w, `;
    });
    // Повертаємо сформований рядок srcset
    return srcSet;
}
