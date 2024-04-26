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
        // Видаляємо частину шляху, яка веде до /var/task/ та додавання /public на Vercel з Linux
        // const relativePath = image.path.replace(/^.*?\/categories/, '/categories');
        // Видаляємо частину шляху, яка веде до /var/task/ та додавання /public у Windows
        // const relativePath = image.path.replace(/^.*\\categories/, 'categories');
        
        const relativePath = image.path.replace( process.env.DEV ? 
            /^.*\\categories/:/^.*?\/categories/ , '/categories')

 

     // Додаємо шлях та роздільну здатність до srcset
        srcSet += `${relativePath} ${image.resolution}w, `;
    });
    // Повертаємо сформований рядок srcset
    return srcSet;
}
