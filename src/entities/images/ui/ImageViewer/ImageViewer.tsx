import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./styles.module.scss";

interface IImageViewerProps {
  photoUrls: string[];
  alt: string;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  photoUrls,
  alt,
}) => {
  const slidesData = [];
  for (let i = 0; i < photoUrls.length; i += 4) {
    slidesData.push(photoUrls.slice(i, i + 4));
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const scrollStartRef = useRef<number>(0);

  function handleImageClick(url: string) {
    setSelectedImage(url);
  }

  function goToSlide(slideIndex: number) {
    setCurrentSlide(slideIndex);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: slideIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      const scrollLeft = sliderRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / slideWidth);

      if (
        newSlide !== currentSlide &&
        newSlide >= 0 &&
        newSlide < slidesData.length
      ) {
        setCurrentSlide(newSlide);
      }
    }
  }, [currentSlide, slidesData.length]);

  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    if (sliderRef.current) {
      scrollStartRef.current = sliderRef.current.scrollLeft;
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!sliderRef.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startXRef.current - currentX;
    sliderRef.current.scrollLeft = scrollStartRef.current + diff;
  }

  function handleTouchEnd() {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      const scrollLeft = sliderRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / slideWidth);
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: newSlide * slideWidth,
          behavior: "smooth",
        });
      }
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  if (slidesData.length === 0) {
    return null;
  }

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slidesData.map((slideImages, slideIndex) => (
          <div key={slideIndex} className={styles.slide}>
            <div className={styles.grid}>
              {slideImages.map((url, imageIndex) => (
                <button
                  className={styles.imgContainer}
                  key={url}
                  onClick={() => handleImageClick(url)}
                  style={{
                    border:
                      selectedImage === url
                        ? "4px solid green"
                        : "1px solid #fff",
                  }}
                >
                  <img
                    className={styles.img}
                    src={url}
                    alt={`${alt} ${slideIndex * 4 + imageIndex + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {slidesData.length > 1 &&
          slidesData.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.activeDot : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
};
