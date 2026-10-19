export interface Book {
    id: string;
    title: string;
    description: string | null;
    rating: number | null;
    pros: string | null;
    cons: string | null;
    cover_url: string | null;
    created_at: Date;
}

export interface CreateBookInput {
    title: string;
    description?: string | null;
    rating?: number | null;
    pros?: string | null;
    cons?: string | null;
    cover_url?: string | null;
}

export type UpdateBookInput = Partial<CreateBookInput>;