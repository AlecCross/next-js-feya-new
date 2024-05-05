// src/components/SubCategories.tsx

import React from 'react';
import gridStyle from "../styles/grid.module.css";
import Link from "next/link";

interface SubCategoriesProps {
    data: Data;
    parentCategoryRoute: string;
}

interface Data {
    title: string;
    subcategories: Category[];
}

interface Category {
    id: string;
    name_ua: string;
    name_ru: string;
    route: string;
    image_path: string;
    image_link_original: string;
}

const SubCategories: React.FC<SubCategoriesProps> = ({ data, parentCategoryRoute }) => {
    return (
        <div>
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <ul className={gridStyle.container}>
                        {data.subcategories.map((category) => (
                            <li className={gridStyle.element} key={category.id}>
                                {/* <Link href={category.route}> */}
                                <Link href={`${parentCategoryRoute}/${category.route}`}>
                                    <div className={gridStyle.element__img_wrapper}>
                                        <img
                                            alt={category.name_ua}
                                            loading="lazy"
                                            decoding="async"
                                            className={gridStyle.element__img}
                                            style={{ color: 'transparent', width: '100%', height: 'auto' }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            srcSet={category.image_link_original || "/default-image.webp"}
                                            src={category.image_link_original || "/default-image.webp"}
                                        />
                                    </div>
                                    <div className={gridStyle.element__name}>{category.name_ua}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SubCategories;
