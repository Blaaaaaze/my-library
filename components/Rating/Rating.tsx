"use client";

import { useState } from "react";
import styles from './Rating.module.scss';

export default function Rating() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const visibleRating = hoveredRating || rating;

    return (
    <fieldset>
      <legend>Rating</legend>

      <input type="hidden" name="rating" value={rating} />

      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setRating(value)}
          onMouseEnter={() => setHoveredRating(value)}
          onMouseLeave={() => setHoveredRating(0)}
          className={`${styles.star} ${value <= visibleRating ? styles.active : ''}`}
        >
          ★
        </button>
      ))}

      <span>{rating ? `${rating} / 5` : "No Rating"}</span>
    </fieldset>
  );
}