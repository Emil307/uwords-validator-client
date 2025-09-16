import React, { useState } from "react";
import styles from "./styles.module.scss";
import { getImagesByWord } from "@/entities/images";

export interface IGetMoreImagesProps {
  word: string;
  imagesUrls: string[];
  setImagesUrls: (imagesUrls: string[]) => void;
}

export const GetMoreImages: React.FC<IGetMoreImagesProps> = ({
  word,
  imagesUrls,
  setImagesUrls,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleGetMoreImages() {
    if (imagesUrls.length < 20 || isLoading) {
      return;
    }

    setIsLoading(true);
    getImagesByWord(word, imagesUrls.length / 20 + 1)
      .then((res) => {
        setImagesUrls([...imagesUrls, ...res.data.images]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleGetMoreImages}
        disabled={imagesUrls.length < 20 || isLoading}
      >
        {isLoading ? (
          <span className={styles.loader}>Загрузка...</span>
        ) : imagesUrls.length < 20 ? (
          "Больше нет изображений"
        ) : (
          "Добавить изображения"
        )}
      </button>
    </div>
  );
};
