import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const ConfrimImageButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      Оставить текущее
    </button>
  );
};
