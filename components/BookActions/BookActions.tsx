"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Book } from "@/types/books";
import styles from "./BookActions.module.scss";

type Props = {
  book: Pick<Book, "id" | "title" | "description" | "rating" | "pros" | "cons" | "cover_url">;
};

export default function BookActions({ book }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [coverData, setCoverData] = useState<string | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setCoverError("Выберите изображение JPG, PNG или WebP.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCoverError("Размер изображения не должен превышать 5 МБ.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCoverData(typeof reader.result === "string" ? reader.result : null);
      setCoverError(null);
    };
    reader.onerror = () => setCoverError("Не удалось прочитать изображение.");
    reader.readAsDataURL(file);
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ratingValue = String(formData.get("rating") ?? "");
    const bookData = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      rating: ratingValue ? Number(ratingValue) : null,
      pros: String(formData.get("pros") ?? "").trim() || null,
      cons: String(formData.get("cons") ?? "").trim() || null,
      ...(coverData ? { cover_url: coverData } : {}),
    };

    setIsSaving(true);
    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast.error(data?.error ?? "Не удалось сохранить изменения");
        return;
      }

      toast.success("Изменения сохранены");
      setIsEditing(false);
      setCoverData(null);
      router.refresh();
    } catch {
      toast.error("Не удалось связаться с сервером");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Удалить книгу «${book.title}»?`)) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        toast.error(data?.error ?? "Не удалось удалить книгу");
        return;
      }

      toast.success("Книга удалена");
      router.push("/collection");
      router.refresh();
    } catch {
      toast.error("Не удалось связаться с сервером");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.actions}>
      {!isEditing ? (
        <>
          <button className={styles.editButton} type="button" onClick={() => setIsEditing(true)}>
            Редактировать
          </button>
          <button className={styles.deleteButton} type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Удаление…" : "Удалить"}
          </button>
        </>
      ) : (
        <form className={styles.form} onSubmit={handleUpdate}>
          <label className={styles.field}>
            Название
            <input name="title" defaultValue={book.title} required />
          </label>
          <label className={styles.field}>
            Описание
            <textarea name="description" defaultValue={book.description ?? ""} rows={3} />
          </label>
          <label className={styles.field}>
            Оценка
            <select name="rating" defaultValue={book.rating ?? ""}>
              <option value="">Без оценки</option>
              {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} / 5</option>)}
            </select>
          </label>
          <label className={styles.field}>
            Понравилось
            <textarea name="pros" defaultValue={book.pros ?? ""} rows={2} />
          </label>
          <label className={styles.field}>
            Что можно улучшить
            <textarea name="cons" defaultValue={book.cons ?? ""} rows={2} />
          </label>
          <label className={styles.field}>
            Обложка книги
            <input name="cover" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleCoverChange} />
            <span className={styles.imageHint}>JPG, PNG или WebP, до 5 МБ. Выберите файл, чтобы заменить текущую обложку.</span>
          </label>
          {(coverData || book.cover_url) && (
            <img className={styles.preview} src={coverData ?? book.cover_url ?? undefined} alt="Предпросмотр обложки" />
          )}
          {coverError && <p className={styles.error}>{coverError}</p>}
          <div className={styles.formActions}>
            <button className={styles.editButton} type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение…" : "Сохранить"}
            </button>
            <button className={styles.cancelButton} type="button" onClick={() => setIsEditing(false)} disabled={isSaving}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
