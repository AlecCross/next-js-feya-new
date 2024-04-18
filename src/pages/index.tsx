//src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import gridStyle from "../styles/grid.module.css";
import { sql } from '@vercel/postgres';
import { scanImageFolder } from '../utils/imageScanner';
import { generateSrcSet } from '../utils/srcsetGenerator';
import { selectHighestResolutionImage } from '../utils/selectHighestResolutionImage';

interface Category {
    id: string;
    srcSet: string;
    name_ua: string;
    image_path: string;
    image_link_original: string;
    highestResolutionImage: string;
}

interface CategoriesProps {
    categories: Category[];
}

const Index: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <div>
            <Head>
                <title>Фея🧚‍♀️ | Інтернет магазин спідньої білизни</title>
                <meta name="description" content="Спідня білизна за доступною ціною. Індивідуальний підбір, з урахуванням ваших уподобань. Бюстгальтери Lanny mode, топи, для годування, коригуюче" />
                <meta charSet="utf-8" />
            </Head>
            <ul className={gridStyle.container}>
                {categories.map((category) => (
                    <li className={gridStyle.element} key={category.id}>
                        <Link href={`${category.id}`}>
                            <div className={gridStyle.element__img_wrapper}>
                                <img
                                    alt={category.name_ua}
                                    loading="lazy"
                                    decoding="async"
                                    className={gridStyle.element__img}
                                    style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    srcSet={category.srcSet ? category.srcSet : undefined}
                                    src={category.highestResolutionImage || category.image_link_original || "/default-image.webp"}
                                />
                            </div>
                            <div className={gridStyle.element__name}>{category.name_ua}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;

export async function getStaticProps() {
    try {
        const result = await sql`
        SELECT id, 
        name_ua, 
        image_path,
        image_link_original
        FROM category
        `;
        const categories: Category[] = result.rows.map((row: any) => {
            const images = scanImageFolder(`public${row.image_path}`);
            return {
                id: row.id,
                name_ua: row.name_ua,
                image_path: row.image_path,
                image_link_original: row.image_link_original,
                srcSet: generateSrcSet(images),
                highestResolutionImage: selectHighestResolutionImage(images)
            };
        });
        return {
            props: {
                categories,
            },
        };
    } catch (error) {
        console.error('Error fetching categories', error);
        return {
            props: {
                categories: [],
            },
        };
    }
}
