import { Category } from "./category";
import { UserDetails } from "./user_detail";

export interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    user: string;
    created_at: string;
    userDetails?: UserDetails;
}