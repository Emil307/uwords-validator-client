import React, { useState } from "react";
import styles from "./styles.module.scss";

interface IImageViewerProps {
  photoUrls: string[];
  alt: string;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  photoUrls,
  alt,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleClick(url: string) {
    setSelectedImage(url);
  }

  return (
    <div className={styles.container}>
      {photoUrls.map((url) => (
        <button
          className={styles.imgContainer}
          key={url}
          onClick={() => handleClick(url)}
          style={{
            border:
              selectedImage === url ? "4px solid green" : "1px solid #fff",
          }}
        >
          <img className={styles.img} src={url} alt={alt} />
        </button>
      ))}
    </div>
  );
};
