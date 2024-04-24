import { Category } from "./category";
import { UserDetails } from "./user_detail";

export interface Post {
    id?: number;
    content: string;
    category: number;
    user: number;
    created_at?: string;
    username?: string;
    likes_count?: number;
    is_liked?: boolean;
}
