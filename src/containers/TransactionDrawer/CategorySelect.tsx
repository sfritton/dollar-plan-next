import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { makeGetCategoryOptions } from './selectors';
import { Select } from '../../components/Input';
import styles from './transaction-drawer.module.css';

const CategorySelect: React.FC = () => {
  const router = useRouter();
  const rawId = router.query.id;
  const budgetId = Array.isArray(rawId) ? '' : rawId;

  const categoryOptions = useSelector(makeGetCategoryOptions(budgetId || ''));

  if (!categoryOptions || categoryOptions.length < 1) return null;

  return (
    <Select label="Category" className={styles.categorySelect}>
      {categoryOptions.map(({ id, title, categories }) => (
        <optgroup key={id} label={title}>
          {categories.map(({ title: catTitle, id }) => (
            <option key={id} value={id}>
              {catTitle}
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
};

export default CategorySelect;
