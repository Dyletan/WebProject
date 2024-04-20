import { Category } from "./category";

export interface Post {
    id: number;
    title: string;
    content: string;
    category: Category;
    user: string;
    created_at: string;
}