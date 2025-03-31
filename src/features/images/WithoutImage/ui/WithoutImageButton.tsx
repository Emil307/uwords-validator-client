import React from "react";
import styles from "./styles.module.scss";

interface Props {
  onClick: () => void;
}

export const WithoutImageButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Без фото
    </button>
  );
};
