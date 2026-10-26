'use client'

import Container from '@/components/Container/Container';
import styles from './page.module.scss';
import Rating from '@/components/Rating/Rating';
import ImageDrop from '@/components/ImageDrop/ImageDrop';
import { SubmitEvent } from 'react';
import { CreateBookInput } from '@/types/books';

export default function NewBook() {
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const rawRating = formData.get("rating");
        
        const bookData: CreateBookInput = {
            title: String(formData.get("title") ?? "").trim(),
            description: String(formData.get("description") ?? ""),
            rating: rawRating ? Number(rawRating) : null,
            pros: String(formData.get("pros") ?? ""),
            cons: String(formData.get("cons") ?? ""),
            cover_url: String(formData.get("cover") ?? "") || null,
        };

        const response = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (response.ok) {
            form.reset();
        }

        

    }

    return <Container>
        <h1>Add new Book</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles['form__text-container']}>
                <label>
                    <span>Title</span>
                    <input type="text" name='title' required/>
                </label>

                <label>
                    <span>Description</span>
                    <textarea name='description' required/>
                </label>

                <label>
                    <span>Pros</span>
                    <textarea name='pros' id="pros" required/>
                </label>

                <label>
                    <span>Cons</span>
                    <textarea name='cons' id="cons" required/>
                </label>
            </div>

            <div className={styles.form__widgets}>
                <Rating />
                <ImageDrop />
                <button className='main-button' type='submit'>Add</button>
            </div>
        </form>
    </Container>
}