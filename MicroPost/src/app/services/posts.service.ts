import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Category} from "../models/category";
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private client: HttpClient) { }

  // getUserPosts(user_id: number): Observable<Post[]> {
  //   return this.client.get<Post[]>(`${this.baseUrl}/users/${user_id}/posts`);
  // }

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
    return this.client.post<Post>(`${this.baseUrl}/posts`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.client.delete(`${this.baseUrl}/posts/${id}`)
  }

  putPost(post: Post): Observable<Post> {
    return this.client.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }

  getUser(id: number): Observable<any> {
    return this.client.get<any>(`${this.baseUrl}/users/${id}`);
  }
}
