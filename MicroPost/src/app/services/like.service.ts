import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../models/like';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private client: HttpClient) { }

  getPostLikes(postId: number): Observable<any> {
    return this.client.get<any>(`${this.baseUrl}/posts/${postId}/likes`);
  }

  addPostLike(like: Like): Observable<any> {
    console.log(like);
    return this.client.post<Like>(`${this.baseUrl}/posts/${like.post_id}/likes`, like);
  }

  deletePostLike(like: Like): Observable<any> {
    console.log(like);
    return this.client.delete<Like>(`${this.baseUrl}/posts/${like.post_id}/likes`);
  }

  checkPostLike(like: Like): Observable<any> {
    return this.client.get<any>(`${this.baseUrl}/posts/${like.post_id}/users/${like.user_id}`);
  }
}
