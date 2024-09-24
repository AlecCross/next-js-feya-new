import Select from 'react-select';
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name_ua: string;
}

interface CategorySelectProps {
  onCategoryChange: (selectedCategoryId: number | null) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Запит на сервер для отримання списку категорій
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name_ua,
  }));

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    const selectedCategoryId = selectedOption ? selectedOption.value : null;
    setSelectedCategory(selectedCategoryId);
    onCategoryChange(selectedCategoryId);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="Оберіть категорію"
      isClearable
      isSearchable
    />
  );
};

export default CategorySelect;
