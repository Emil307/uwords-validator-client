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
  UpdateWordRequestDTO,
} from "@/entities/images";
import styles from "./styles.module.scss";
import { Button } from "@/shared";

export const ValidateImage: React.FC = () => {
  const [word, setWord] = useState<ITWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModerating, setIsModerating] = useState(false);
  const [moderatedCount, setModeratedCount] = useState("");
  const [editedTranslationEn, setEditedTranslationEn] = useState("");
  const [editedTranslationRu, setEditedTranslationRu] = useState("");
  const [comment, setComment] = useState("");
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [isConvertInfiniteLater, setIsConvertInfiniteLater] = useState(false);
  const [isSpecialWord, setIsSpecialWord] = useState(false);

  useEffect(() => {
    handleGetNextWord();
    handleGetModeratedCount();
  }, []);

  function handleGetNextWord() {
    setIsLoading(true);
    getNextWord()
      .then((res) => {
        setWord(res.data);
        setModeratedCount(moderatedCount + 1);
        setImagesUrls(res.data.photo_urls);
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
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function moderateWord(data: UpdateWordRequestDTO) {
    if (!word) return;

    setIsModerating(true);
    updateWord(word.id, {
      ...data,
      is_moderated: true,
      en: editedTranslationEn ? editedTranslationEn : word.en,
      ru: editedTranslationRu ? editedTranslationRu : word.ru,
      is_add_later: isConvertInfiniteLater,
      is_special_word: isSpecialWord,
      comment: comment,
    })
      .then(() => {
        handleGetNextWord();
        setEditedTranslationEn("");
        setEditedTranslationRu("");
        setComment("");
        setSelectedPhoto("");
        setIsConvertInfiniteLater(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleGoNext() {
    if (selectedPhoto === "" && word?.photo_urls.length !== 0) {
      return;
    }

    moderateWord({
      selected_photo: selectedPhoto,
    });
  }

  function handleIncorectWord() {
    moderateWord({
      selected_photo: "",
      is_wrong_translation: true,
    });
  }

  function handleWithoutImage() {
    moderateWord({
      selected_photo: "",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.moderatedCount}>{moderatedCount}</span>
        <GetMoreImages
          word={word?.en || ""}
          imagesUrls={imagesUrls}
          setImagesUrls={setImagesUrls}
        />
      </div>
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
      <div className={styles.inputs}>
        <input
          className={styles.input}
          placeholder="Eng"
          value={editedTranslationEn}
          onChange={(e) => setEditedTranslationEn(e.target.value)}
        ></input>
        <input
          className={styles.input}
          placeholder="Рус"
          value={editedTranslationRu}
          onChange={(e) => setEditedTranslationRu(e.target.value)}
        ></input>
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Примечание (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className={styles.checkboxes}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isConvertInfiniteLater}
            onChange={() => setIsConvertInfiniteLater(!isConvertInfiniteLater)}
            id="isConvertInfiniteLater"
            className={styles.checkbox}
          />
          <label
            htmlFor="isConvertInfiniteLater"
            className={styles.checkboxLabel}
          >
            Привести к инфинитиву позже
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isSpecialWord}
            onChange={() => setIsSpecialWord(!isSpecialWord)}
            id="isSpecialWord"
            className={styles.checkbox}
          />
          <label htmlFor="isSpecialWord" className={styles.checkboxLabel}>
            Специализированное слово
          </label>
        </div>
      </div>

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
        <Button
          onClick={handleIncorectWord}
          disabled={isLoading || isModerating}
          style={{ marginTop: "1rem" }}
        >
          Нерелевантное слово
        </Button>
      </div>
    </div>
  );
};
