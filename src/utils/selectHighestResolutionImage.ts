//src/utils/selectHighestResolutionImage.ts

interface Image {
    path: string;
    resolution: number;
}

export function selectHighestResolutionImage(images: Image[] = []): string {
    // Сортуємо масив зображень за їхніми роздільними здатностями у зростаючому порядку
    const sortedImages = images.sort((a, b) => a.resolution - b.resolution);
    // Повертаємо шлях до зображення з найбільшою роздільною здатністю
    return sortedImages.length > 0 ? sortedImages[sortedImages.length - 1].path : '';
}
