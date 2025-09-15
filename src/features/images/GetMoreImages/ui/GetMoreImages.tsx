import React from "react";
import styles from "./styles.module.scss";

export const GetMoreImages: React.FC = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Добавить изображения</button>
    </div>
  );
};
