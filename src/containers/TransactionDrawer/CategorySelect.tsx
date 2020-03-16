import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { makeGetCategoryOptions } from './selectors';
import Select, { Props as SelectProps } from '../../components/Input/Select';
import styles from './transaction-drawer.module.css';

interface Props {
  value?: SelectProps['value'];
  onChange?: SelectProps['onChange'];
}

const CategorySelect: React.FC<Props> = ({ value, onChange }) => {
  const router = useRouter();
  const rawId = router.query.id;
  const budgetId = Array.isArray(rawId) ? '' : rawId;

  const categoryOptions = useSelector(makeGetCategoryOptions(budgetId || ''));

  if (!categoryOptions || categoryOptions.length < 1) return null;

  return (
    <Select label="Category" className={styles.categorySelect} value={value} onChange={onChange}>
      {categoryOptions.map(({ id, title, categories }) => (
        <optgroup key={id} label={title}>
          {categories.map(({ title: catTitle, id: catId }) => (
            <option key={catId} value={catId}>
              {catTitle}
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
};

export default CategorySelect;
