import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = '';
  constructor(private client: HttpClient) { }

  getUserPosts(user_id: number): Observable<Post[]> {
    return this.client.get<Post[]>(`${this.baseUrl}/users/${user_id}/posts`);
  }

  getPosts(): Observable<Post[]>{
    return this.client.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.client.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getCategories(): Observable<Category[]>{
    return this.client.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this.client.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  createPost(post: Post) {
    return this.client.post<Post>(`${this.baseUrl}/posts/`, post);
  }

  // maybe use post.id as argument, instead of whole post
  deletePost(id: number): Observable<any> {
    return this.client.delete(`${this.baseUrl}/posts/${id}`)
  }

  putPost(post: Post): Observable<Post> {
    return this.client.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }
}
