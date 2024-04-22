// pages/[...slug].tsx

import { useRouter } from 'next/router';
import { getCategoryData } from '../utils/getCategoryData'; // Функції для отримання даних з БД
import { getProductData } from '../utils/getProductData'; // Функції для отримання даних з БД
import { getProducts } from '../utils/getProducts'; // Функції для отримання даних з БД

import gridStyle from "../styles/grid.module.css";
import Link from 'next/link';

interface Data {
    parentCategoryId: string,
    title: string;
    description: string;
    parentCategoryRoute: string;
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

interface Product {
    id: number,
    vendor_code: string,
    name_ua: string,
    name_ru: string,
    description_ua: string,
    description_ru: string,
    image_path: string,
    image_link: string,
    product_category_id: string,
}


interface GetServerSidePropsContext {
    params: { slug: string[] };
}

const DynamicPage = ({ data, products }: { data: Data, products: Product[] }) => {
    const router = useRouter();
    const slug = router.query.slug as string[];  // Використання type твердження для slug
    const [category, subcategory, productId] = slug;

    if (category && !subcategory) return (
        <div>
            <h1>Dynamic Page</h1>
            <p>Category: {category}</p>
            {subcategory && <p>Subcategory: {subcategory}</p>}
            {productId && <p>Product ID: {productId}</p>}
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
                                <Link href={`${data.parentCategoryRoute}/${category.route}`}>
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
    if (category && subcategory) return (
        <div>
            <h1>Dynamic Page</h1>
            {subcategory && <p>Subcategory: {subcategory}</p>}
            {productId && <p>Product ID: {productId}</p>}
            <div>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <ul className={gridStyle.container}>
                    {products.map((product, index) => <div key={index}>
                        <li className={gridStyle.element} key={product.id}>
                            <Link href={`${data.parentCategoryRoute}/${data.subcategories.find(sub => sub.id === product.product_category_id)?.route}/${product.id}`}>
                                <div className={gridStyle.element__img_wrapper}>
                                    <img
                                        alt={product.name_ua}
                                        loading="lazy"
                                        decoding="async"
                                        className={gridStyle.element__img}
                                        style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        srcSet={undefined ? undefined : undefined}
                                        src={undefined || undefined || "/default-image.webp"}
                                    />
                                </div>
                                <div className={gridStyle.element__name}>{product.name_ua}</div>
                            </Link>
                        </li>
                    </div>)}
                </ul>
            </div>
        </div >
    );
};

// Функція SSR для отримання даних на основі параметрів шляху
export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const [category, subcategory, productId] = params.slug || [];

    let data = {};
    let products: Product[] = [];

    if (productId) {
        // Якщо є productId, отримуємо дані продукту
        data = await getProductData(productId);
    } else if (subcategory) {
        // Якщо є subcategory, отримуємо дані продуктів
        data = await getCategoryData(category);
        products = await getProducts(subcategory);
    } else if (category) {
        // Якщо є category, отримуємо дані категорії
        data = await getCategoryData(category);
    }

    return { props: { data, products } };
}

export default DynamicPage;
