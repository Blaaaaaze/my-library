"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./ImageDrop.module.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageDrop() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError(null);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <label className={styles.coverField}>
      <span className={styles.label}>Book image</span>

      <span className={styles.dropZone}>
        <input
          className={styles.fileInput}
          type="file"
          name="cover"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />

        {previewUrl ? (
          <>
            <span className={styles.fileName}>{fileName}</span>
            <span className={styles.success}>✓ Image selected</span>
          </>
        ) : (
          <>
            <span className={styles.dropTitle}>
              Click to upload or drag an image here
            </span>
            <span className={styles.dropHint}>
              JPG, PNG, or WebP up to 5 MB
            </span>
          </>
        )}
      </span>

      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}