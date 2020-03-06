import React from "react";
import "./progress-bar.css";

interface Props {
  numerator: number;
  denominator: number;
  danger?: boolean;
}

const getProgressBarClassName = ({ numerator, denominator, danger }: Props) => {
  if (denominator <= 0 && numerator <= 0) {
    return "progress-bar--null";
  }

  if (numerator > denominator && danger) {
    return "progress-bar--danger";
  }

  return "progress-bar--inner";
};

function ProgressBar(props: Props) {
  const { numerator, denominator } = props;

  const className = getProgressBarClassName(props);

  const percent = Math.max(Math.min(numerator / denominator, 1), 0);

  return (
    <div className="progress-bar">
      <div className={className} style={{ transform: `scaleX(${percent})` }} />
    </div>
  );
}

export default ProgressBar;
