// src/components/Products.tsx

import React from 'react';
import gridStyle from "../styles/grid.module.css";
import Link from "next/link";

interface Product {
    id: number;
    name_ua: string;
    name_ru: string;
    description_ua: string;
    description_ru: string;
    image_path: string;
    image_link: string;
    product_category_id: string;
}

interface ProductsProps {
    products: Product[];
    parentCategoryRoute: string;
    subcategoryRoute: string;
}

const Products: React.FC<ProductsProps> = ({ products, parentCategoryRoute, subcategoryRoute }) => {
    console.log("products ", products)
    return (
        <div>
            <ul className={gridStyle.container}>
                {products.map((product) => (
                    <li className={gridStyle.element} key={product.id}>
                        <Link href={`${parentCategoryRoute}/${subcategoryRoute}/${product.id}`}>
                            <div className={gridStyle.element__img_wrapper}>
                                <img
                                    alt={product.name_ua}
                                    loading="lazy"
                                    decoding="async"
                                    className={gridStyle.element__img}
                                    style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    srcSet={product.image_link || "/default-image.webp"}
                                    src={product.image_link || "/default-image.webp"}
                                />
                            </div>
                            <div className={gridStyle.element__name}>{product.name_ua}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
