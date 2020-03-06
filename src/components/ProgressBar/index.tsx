import React from 'react';
import styles from './progress-bar.module.css';

interface Props {
  numerator: number;
  denominator: number;
  danger?: boolean;
}

const getProgressBarClassName = ({ numerator, denominator, danger }: Props) => {
  if (denominator <= 0 && numerator <= 0) {
    return styles.null;
  }

  if (numerator > denominator && danger) {
    return styles.danger;
  }

  return styles.inner;
};

function ProgressBar(props: Props) {
  const { numerator, denominator } = props;

  const className = getProgressBarClassName(props);

  const percent = Math.max(Math.min(numerator / denominator, 1), 0);

  return (
    <div className={styles.base}>
      <div className={className} style={{ transform: `scaleX(${percent})` }} />
    </div>
  );
}

export default ProgressBar;
