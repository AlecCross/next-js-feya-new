//src/components/Categories.tsx

import React from 'react'
import gridStyle from "../styles/grid.module.css";
import Link from "next/link";

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

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <div>
            <ul className={gridStyle.container}>
                {categories.map((category) => (
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
    )
}

export default Categories
