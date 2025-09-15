import React from "react";
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
  function handleGetMoreImages() {
    getImagesByWord(word)
      .then((res) => {
        setImagesUrls([...imagesUrls, ...res.data.images]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleGetMoreImages}>
        Добавить изображения
      </button>
    </div>
  );
};
