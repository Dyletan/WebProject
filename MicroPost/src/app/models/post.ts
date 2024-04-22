import { Category } from "./category";
import { UserDetails } from "./user_detail";

export interface Post {
    id?: number;
    content: string;
    category: string;
    user: number;
    created_at?: string;
    userDetails?: UserDetails;
}
