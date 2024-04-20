import { Category } from "./category";

export interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    user: string;
    created_at: string;
}