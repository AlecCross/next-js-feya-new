//src/components/Product

import React from 'react';
import styles from '../styles/productPage.module.css'

interface Product {
    product_category_id: number;
    id: number;
    name_ua: string;
    name_ru: string;
    description_ua: string;
    description_ru: string;
    image_path: string;
    image_link: string;
    vendor_code: string;
}

interface ProductProps{
    product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    console.log("product ", product)
    return (
      <div className={styles.wrapper}>
        <div className={styles.column}>
          {/* Треба за product.image_path отримувати масив який містить інформацїю  про локальні зображення з 
            src та srcset для кожного */}
          <div>{product.image_path}</div>
          {/* Посилання на зоабраження на onedrive */}
          <img
            className={styles.image}
            src={product.image_link || "/default-image.webp"}
            alt="image"
          />
          {/* <div>{product.image_link}</div> */}
        </div>
        <div className={styles.column}>
          <div className={styles.details}>
            <div className={styles.vendor}>{product.vendor_code}</div>
            <div className={styles.name}>{product.name_ua}</div>
            <div>
              <div>Про товар:</div>
              <div className={styles.description}>{product.description_ua}</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Product;
