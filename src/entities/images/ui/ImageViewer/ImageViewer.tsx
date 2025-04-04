import React from "react";
import styles from "./styles.module.scss";

interface IImageViewerProps {
  photoUrl: string;
  alt: string;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({ photoUrl, alt }) => {
  return (
    <div>
      <img className={styles.img} src={photoUrl} alt={alt} />
    </div>
  );
};
