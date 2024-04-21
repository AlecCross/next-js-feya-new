// pages/[...slug].tsx

import { useRouter } from 'next/router';
import { getCategoryData } from '../utils/getCategoryData'; // Функції для отримання даних з БД
import { getProductData } from '../utils/getProductData'; // Функції для отримання даних з БД

import gridStyle from "../styles/grid.module.css";
import { scanImageFolder } from '../utils/imageScanner';
import { generateSrcSet } from '../utils/srcsetGenerator';
import { selectHighestResolutionImage } from '../utils/selectHighestResolutionImage';
import Link from 'next/link';

interface Data {
    title: string;
    description: string;
    subcategories: Category[]; // Додано властивість для зберігання дочірніх категорій
}

interface Category {
    id: string;
    name_ua: string;
    name_ru: string;
    route: string;
    image_path: string;
    image_link_original: string;
}

interface GetServerSidePropsContext {
    params: { slug: string[] };
}

const DynamicPage = ({ data }: { data: Data }) => {
    const router = useRouter();
    const slug = router.query.slug as string[];  // Використання type твердження для slug
    const [category, subcategory, productId] = slug;
    return (
        <div>
            <h1>Dynamic Page</h1>
            <p>Category: {category}</p>
            {subcategory && <p>Subcategory: {subcategory}</p>}
            {productId && <p>Product ID: {productId}</p>}
            {/* Відображення даних */}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    {
                        data.subcategories.map((sub, index) => <>
                            <div>{sub.id}</div>
                            <div>{sub.name_ru}</div>
                            <div>{sub.name_ua}</div>
                            <div>{sub.route}</div>
                            <div>{sub.image_link_original}</div>
                            <div>{sub.image_path}</div>
                        </>)
                    }
                    {<ul className={gridStyle.container}>
                        {data.subcategories.map((category) => (
                            <li className={gridStyle.element} key={category.id}>
                                <Link href={`${category.route}`}>
                                    <div className={gridStyle.element__img_wrapper}>
                                        <img
                                            alt={category.name_ua}
                                            loading="lazy"
                                            decoding="async"
                                            className={gridStyle.element__img}
                                            style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            srcSet={undefined ? undefined : undefined}
                                            src={undefined || category.image_link_original || "/default-image.webp"}
                                        />
                                    </div>
                                    <div className={gridStyle.element__name}>{category.name_ua}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>}
                </div>
            )}
        </div>
    );
};

// Функція SSR для отримання даних на основі параметрів шляху
export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const [category, subcategory, productId] = params.slug || [];

    let data = {};

    if (productId) {
        // Якщо є productId, отримуємо дані продукту
        data = await getProductData(productId);
    } else if (subcategory) {
        // Якщо є subcategory, отримуємо дані підкатегорії
        data = await getCategoryData(subcategory);
    } else if (category) {
        // Якщо є category, отримуємо дані категорії
        data = await getCategoryData(category);
    }

    return { props: { data } };
}

export default DynamicPage;
