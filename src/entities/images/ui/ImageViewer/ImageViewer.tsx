import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// @ts-expect-error CSS files don't have TypeScript declarations
import "swiper/css";
// @ts-expect-error CSS files don't have TypeScript declarations
import "swiper/css/pagination";
// Убираем импорт navigation CSS, так как используем кастомные кнопки

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
  const swiperRef = useRef<SwiperType | null>(null);

  const slidesData = [];
  for (let i = 0; i < photoUrls.length; i += 4) {
    slidesData.push(photoUrls.slice(i, i + 4));
  }

  function handleImageClick(url: string) {
    setSelectedPhoto(url);
  }

  function handlePrevSlide() {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }

  function handleNextSlide() {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }

  if (slidesData.length === 0) {
    return null;
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.navigationContainer}>
        <button
          className={`${styles.swiperButtonPrev} ${styles.swiperButton}`}
          onClick={handlePrevSlide}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`${styles.swiperButtonNext} ${styles.swiperButton}`}
          onClick={handleNextSlide}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        // pagination={{
        //   clickable: true,
        //   bulletClass: styles.dot,
        //   bulletActiveClass: styles.activeDot,
        //   horizontalClass: styles.dots,
        // }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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
