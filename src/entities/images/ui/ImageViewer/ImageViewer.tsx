import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// @ts-expect-error CSS files don't have TypeScript declarations
import "swiper/css";
// @ts-expect-error CSS files don't have TypeScript declarations
import "swiper/css/pagination";

import styles from "./styles.module.scss";
import { ImageWithLoader } from "./ImageWithLoader";

interface IImageViewerProps {
  photoUrls: string[];
  alt: string;
  selectedPhoto: string;
  setSelectedPhoto: (url: string) => void;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  photoUrls,
  alt,
  selectedPhoto,
  setSelectedPhoto,
}) => {
  const slidesData = [];
  for (let i = 0; i < photoUrls.length; i += 4) {
    slidesData.push(photoUrls.slice(i, i + 4));
  }

  function handleImageClick(url: string) {
    setSelectedPhoto(url);
  }

  if (slidesData.length === 0) {
    return null;
  }

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: styles.dot,
          bulletActiveClass: styles.activeDot,
          horizontalClass: styles.dots,
        }}
        className={styles.swiper}
        touchStartPreventDefault={false}
        preventInteractionOnTransition={false}
        allowTouchMove={true}
        touchEventsTarget="container"
        touchRatio={1}
        threshold={10}
        longSwipes={true}
        shortSwipes={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        {slidesData.map((slideImages, slideIndex) => (
          <SwiperSlide key={slideIndex} className={styles.slide}>
            <div className={styles.grid}>
              {slideImages.map((url, imageIndex) => (
                <ImageWithLoader
                  key={url}
                  src={url}
                  alt={`${alt} ${slideIndex * 4 + imageIndex + 1}`}
                  isSelected={selectedPhoto === url}
                  onClick={() => handleImageClick(url)}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
