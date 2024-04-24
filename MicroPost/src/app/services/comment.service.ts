import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Comment} from "../models/comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = 'http://127.0.0.1:8000/api/comments';

  constructor(private http: HttpClient) { }

  getComments(post_id: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.url}/${post_id}`);
  }

  postComment(post_id: number, comment: Comment){
    return this.http.post(`${this.url}/${post_id}`, comment);
  }
}
