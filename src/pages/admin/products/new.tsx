import { useState } from 'react';
import CategorySelect from '../../../components/CategorySelect'; // Шлях до вашого компонента

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    vendor_code: '',
    name_ua: '',
    name_ru: '',
    description_ua: '',
    description_ru: '',
    image_link: '',
    product_category_id: null as number | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (selectedCategoryId: number | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      product_category_id: selectedCategoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/products/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newProduct = await res.json();
        alert('Product created successfully!');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

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
        <label>Category:</label>
        <CategorySelect onCategoryChange={handleCategoryChange} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}
