import React, { useState } from "react";
import styles from "./styles.module.scss";

interface IImageWithLoaderProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ImageWithLoader: React.FC<IImageWithLoaderProps> = ({
  src,
  alt,
  isSelected,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <button
      className={styles.imgContainer}
      onClick={onClick}
      style={{
        border: isSelected ? "4px solid green" : "1px solid #fff",
        minHeight: "120px", // Обеспечиваем фиксированную высоту
      }}
    >
      {isLoading && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.loader}></div>
        </div>
      )}
      {hasError && (
        <div className={styles.imagePlaceholder}>
          <span className={styles.errorText}>Ошибка загрузки</span>
        </div>
      )}
      <img
        className={`${styles.img} ${isLoading ? styles.hidden : ""}`}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          minHeight: "120px", // Обеспечиваем фиксированную высоту для изображения
        }}
      />
    </button>
  );
};
