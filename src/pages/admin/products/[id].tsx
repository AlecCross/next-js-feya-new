import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const [formData, setFormData] = useState({
    vendor_code: '',
    name_ua: '',
    name_ru: '',
    description_ua: '',
    description_ru: '',                  
    image_link: '',
    product_category_id: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  // Функція виноситься на рівень вище в компоненті
  async function fetchProduct(productId: any) {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const product = await res.json();
      setFormData({
        vendor_code: product.vendor_code,
        name_ua: product.name_ua,
        name_ru: product.name_ru,
        description_ua: product.description_ua,
        description_ru: product.description_ru,
        image_link: product.image_link,
        product_category_id: product.product_category_id.toString(),
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch product', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct(id); // Виклик функції
    }
  }, [id]);

  const handleChange = (e :any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const productCategoryId = formData.product_category_id ? parseInt(formData.product_category_id, 10) : null;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, product_category_id: productCategoryId }),
      });

      if (res.ok) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  if (loading) return <p>Loading...</p>;


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Vendor Code:</label>
        <input name="vendor_code" value={formData.vendor_code} onChange={handleChange} />
      </div>
      <div>
        <label>Name (UA):</label>
        <input name="name_ua" value={formData.name_ua} onChange={handleChange} />
      </div>
      <div>
        <label>Name (RU):</label>
        <input name="name_ru" value={formData.name_ru} onChange={handleChange} />
      </div>
      <div>
        <label>Description (UA):</label>
        <textarea name="description_ua" value={formData.description_ua} onChange={handleChange} />
      </div>
      <div>
        <label>Description (RU):</label>
        <textarea name="description_ru" value={formData.description_ru} onChange={handleChange} />
      </div>
      <div>
        <label>Image Link:</label>
        <input name="image_link" value={formData.image_link} onChange={handleChange} />
      </div>
      <div>
        <label>Category ID:</label>
        <input name="product_category_id" value={formData.product_category_id} onChange={handleChange} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
}
