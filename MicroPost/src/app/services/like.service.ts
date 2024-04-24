import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  private like_id = 0;

  constructor(private client: HttpClient, private userService: UserService) {
  }
  likePost(post_id: number): Observable<any> {
    return this.client.post(`${this.baseUrl}/like/${this.userService.get_user_id()}/${post_id}/`, {});
  }
  unlikePost(post_id: number): Observable<any> {
    return this.client.delete(`${this.baseUrl}/like/${this.userService.get_user_id()}/${post_id}/`);
  }

  isPostLiked(post_id: number): Observable<boolean> {
    return this.client.get<{ like_id: number }>(`${this.baseUrl}/like/${this.userService.get_user_id()}/${post_id}/`).pipe(
      map(response => !!response.like_id)
    );
  }
}
