import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name_ua: string;
  description_ua: string;
  image_path: string;
  // інші поля, які вам потрібні
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this product?');

    if (confirmed) {
      try {
        const res = await fetch(`/api/products/deleteProduct?id=${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id));
          alert('Product deleted successfully!');
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products</h1>
      <Link href="/admin/products/new">
        <button>Add New Product</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name_ua}</td>
              <td>{product.description_ua}</td>
              <td>
                {product.image_path && <img src={product.image_path} alt={product.name_ua} width={50} />}
              </td>
              <td>
                <Link href={`/admin/products/${product.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
