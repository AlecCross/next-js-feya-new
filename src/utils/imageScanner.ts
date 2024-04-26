import fs from 'fs';
import path from 'path';

interface Image {
    path: string;
    resolution: number;
}

export function scanImageFolder(folderPath: string): Image[] {
    const images: Image[] = [];
    const absoluteFolderPath = path.join(process.cwd(), folderPath);
    
    // Скануємо вміст папки
    // console.log("absoluteFolderPath ", absoluteFolderPath);
    const files = fs.readdirSync(absoluteFolderPath);
    // console.log("files ", files);

    // Проходимося по кожному файлу
    files.forEach((file: string) => {
        // Отримуємо повний шлях до файлу
        const filePath = path.join(absoluteFolderPath, file);
        // Отримуємо інформацію про файл
        const fileInfo = fs.statSync(filePath);

        // Перевіряємо, чи є це файл зображення
        if (fileInfo.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
            // Отримуємо роздільну здатність зображення з його імені
            const matchResult = file.match(/(\d+)p/i);
            const resolution = matchResult ? parseInt(matchResult[1]) : 0; // 0 значення за замовчуванням, замість null

            // Додаємо інформацію про зображення до масиву
            images.push({
                path: filePath,
                resolution: resolution
            });
        }
    });
    // console.log("files ", files);

    return images;
}
