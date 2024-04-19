// pages/[...slug].tsx

import { useRouter } from 'next/router';
import {getCategoryData} from '../utils/getCategoryData'; // Функції для отримання даних з БД
import {getProductData} from '../utils/getProductData'; // Функції для отримання даних з БД

interface Data {
    title: string;
    description: string;
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
