import React from "react";
import { ValidateImage } from "@/widgets/ValidateImage";
import styles from "./styles.module.scss";

export const ValidateImagesPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <ValidateImage />
    </div>
  );
};
