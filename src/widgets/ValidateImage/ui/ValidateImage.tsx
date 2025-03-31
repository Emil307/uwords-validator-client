import React, { useEffect } from "react";
import {
  AddImageLater,
  ConfrimImageButton,
  WithoutImageButton,
} from "@/features/images";
import { ImageViewer } from "@/entities/images";
import styles from "./styles.module.scss";

export const ValidateImage: React.FC = () => {
  // const [currentImageURL, setCurrentImageURL] = useState("");

  useEffect(() => {
    // to do получение по api
  }, []);

  function handleWithoutImage() {
    // to do  api запрос
  }

  function handleAddImageLater() {
    // to do  api запрос
  }

  function handleConfirmImage() {
    // to do  api запрос
  }

  return (
    <div className={styles.container}>
      <ImageViewer />
      <div className={styles.buttons}>
        <ConfrimImageButton onClick={handleConfirmImage} />
        <div className={styles.bottom}>
          <WithoutImageButton onClick={handleWithoutImage} />
          <AddImageLater onClick={handleAddImageLater} />
        </div>
      </div>
    </div>
  );
};
