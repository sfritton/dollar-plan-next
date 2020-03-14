import React from 'react';
import { InputText } from '../../components/Input';
import { useSelector } from 'react-redux';
import { getIsAdjustingBudget } from '../../state/ui/selectors';
import styles from './group.module.css';
import { useAction } from '../../state/hooks';
import groupsSlice from '../../state/groups/slice';
import { Budget } from '../../types/budget';

interface Props {
  title: string;
  id: Budget.Id;
}

function GroupHeading(props: Props) {
  const { title, id } = props;
  const updateTitle = useAction(groupsSlice.actions.updateGroupTitle);
  const isAdjustingBudget = useSelector(getIsAdjustingBudget);

  return (
    <div className={styles.title}>
      {isAdjustingBudget ? (
        <InputText
          className={styles.titleInput}
          value={title}
          label="Group name"
          onChange={e => updateTitle({ id, title: e.target.value })}
        />
      ) : (
        <h3>{title}</h3>
      )}
    </div>
  );
}

export default GroupHeading;
