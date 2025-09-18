import React, { useEffect, useState } from "react";
import {
  ConfrimImageButton,
  GetMoreImages,
  WithoutImageButton,
} from "@/features/images";
import {
  getModeratedCount,
  getNextWord,
  ImageViewer,
  ITWord,
  updateWord,
} from "@/entities/images";
import styles from "./styles.module.scss";
import { Button } from "@/shared";

export const ValidateImage: React.FC = () => {
  const [word, setWord] = useState<ITWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModerating, setIsModerating] = useState(false);
  const [moderatedCount, setModeratedCount] = useState("");
  const [editedTranslation, setEditedTranslation] = useState("");
  const [comment, setComment] = useState("");
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  useEffect(() => {
    handleGetNextWord();
    handleGetModeratedCount();
  }, []);

  function handleGetNextWord() {
    setIsLoading(true);
    getNextWord()
      .then((res) => {
        setWord(res.data);
        setImagesUrls(res.data.photo_urls);
        setModeratedCount(moderatedCount + 1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleGetModeratedCount() {
    getModeratedCount()
      .then((res) => {
        setModeratedCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleGoNext() {
    if (selectedPhoto === "") {
      return;
    }

    if (!word) return;

    setIsModerating(true);
    updateWord(word.id, {
      is_moderated: true,
      selected_photo: selectedPhoto,
      en: editedTranslation ? editedTranslation : word.en,
      comment: comment,
    })
      .then(() => {
        handleGetNextWord();
        setEditedTranslation("");
        setComment("");
        setSelectedPhoto("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleIncorectWord() {
    if (!word) return;
    setIsModerating(true);
    updateWord(word.id, {
      is_moderated: true,
      selected_photo: "",
      en: editedTranslation ? editedTranslation : word.en,
      comment: comment,
      is_wrong_translation: true,
    })
      .then(() => {
        handleGetNextWord();
        setEditedTranslation("");
        setComment("");
        setSelectedPhoto("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleWithoutImage() {
    if (!word) return;
    setIsModerating(true);
    updateWord(word.id, {
      is_moderated: true,
      selected_photo: "",
      en: editedTranslation ? editedTranslation : word.en,
      comment: comment,
    })
      .then(() => {
        handleGetNextWord();
        setEditedTranslation("");
        setComment("");
        setSelectedPhoto("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  return (
    <div className={styles.container}>
      <Button onClick={handleIncorectWord} disabled={isLoading || isModerating}>
        Нерелевантное слово
      </Button>
      <GetMoreImages
        word={word?.en || ""}
        imagesUrls={imagesUrls}
        setImagesUrls={setImagesUrls}
      />
      {(isLoading || isModerating) && (
        <div className={styles.loadingImage}></div>
      )}
      {!isLoading && !isModerating && (
        <ImageViewer
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          photoUrls={imagesUrls}
          alt={word?.en || ""}
        />
      )}
      <h2 className={styles.word}>
        {(isLoading || isModerating) && "Loading... / Loading..."}
        {!isLoading && !isModerating && `${word?.en} / ${word?.ru}`}
      </h2>
      <input
        className={styles.input}
        placeholder="Редактированный перевод (необязательно)"
        value={editedTranslation}
        onChange={(e) => setEditedTranslation(e.target.value)}
      ></input>
      <textarea
        className={styles.textarea}
        placeholder="Примечание (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className={styles.buttons}>
        <ConfrimImageButton
          onClick={handleGoNext}
          disabled={isLoading || isModerating}
        />
        {word && word?.photo_urls.length > 0 && (
          <WithoutImageButton
            onClick={handleWithoutImage}
            disabled={isLoading || isModerating}
          />
        )}
      </div>
    </div>
  );
};
