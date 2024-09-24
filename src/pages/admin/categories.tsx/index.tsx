import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name_ua: string;
  name_ru: string;
  route: string;
  image_path: string;
  image_link_original: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            {/* інші заголовки стовпців */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{`${parseInt(category.id, 10) - 1}`}</td>
              <td>
                {category.image_path && (
                  <img src={`../${category.image_path}/image-256p.webp`} alt={category.name_ua} width={50} />
                  //<p>{category.image_path}</p>
                )}
              </td>
              <td>{category.name_ua}</td>
              {/* інші дані */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
