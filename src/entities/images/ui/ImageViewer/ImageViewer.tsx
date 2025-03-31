import React from "react";
import image1 from "@/assets/images/1.jpg";
import styles from "./styles.module.scss";

export const ImageViewer: React.FC = () => {
  return (
    <div>
      <img className={styles.img} src={image1} alt="1" />
    </div>
  );
};
