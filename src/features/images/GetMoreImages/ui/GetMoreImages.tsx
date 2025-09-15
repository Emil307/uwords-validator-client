import React from "react";
import styles from "./styles.module.scss";

export interface IGetMoreImagesProps {
  imagesUrls: string[];
  setImagesUrls: (imagesUrls: string[]) => void;
}

export const GetMoreImages: React.FC<IGetMoreImagesProps> = ({
  imagesUrls,
  setImagesUrls,
}) => {
  function handleGetMoreImages() {
    setImagesUrls(imagesUrls.concat(imagesUrls));
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleGetMoreImages}>
        Добавить изображения
      </button>
    </div>
  );
};
