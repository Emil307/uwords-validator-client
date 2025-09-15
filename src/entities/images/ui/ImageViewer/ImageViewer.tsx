import React from "react";
import styles from "./styles.module.scss";

interface IImageViewerProps {
  photoUrls: string[];
  alt: string;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  photoUrls,
  alt,
}) => {
  return (
    <div className={styles.container}>
      {photoUrls.map((url) => (
        <button className={styles.imgContainer} key={url}>
          <img className={styles.img} src={url} alt={alt} />
        </button>
      ))}
    </div>
  );
};
