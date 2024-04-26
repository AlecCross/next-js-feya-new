//src/pages/index.tsx
import Head from "next/head";
import { sql } from '@vercel/postgres';
import { scanImageFolder } from '../utils/imageScanner';
import { generateSrcSet } from '../utils/srcsetGenerator';
import { selectHighestResolutionImage } from '../utils/selectHighestResolutionImage';
import Categories from "@/components/Categories";

interface Category {
    id: string;
    srcSet: string;
    name_ua: string;
    image_path: string;
    route: string;
    image_link_original: string;
    highestResolutionImage: string;
}

interface CategoriesProps {
    categories: Category[];
}

const Index: React.FC<CategoriesProps> = ({ categories }) => {
    return <>
        <Head>
            <title>Фея🧚‍♀️ | Інтернет магазин спідньої білизни</title>
            <meta name="description" content="Спідня білизна за доступною ціною. Індивідуальний підбір, з урахуванням ваших уподобань. Бюстгальтери Lanny mode, топи, для годування, коригуюче" />
            <meta charSet="utf-8" />
        </Head>
        <Categories categories={categories} />
    </>
};

export default Index;

export async function getServerSideProps() {
    try {
        const result = await sql`
            SELECT id, 
            name_ua, 
            image_path,
            image_link_original,
            route
            FROM category
            WHERE parent_id IS NULL
        `;
        const categories: Category[] = result.rows.map((row: any) => {
            const images = scanImageFolder(`${row.image_path}`);
            return {
                id: row.id,
                name_ua: row.name_ua,
                image_path: row.image_path,
                image_link_original: row.image_link_original,
                route: row.route,
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
