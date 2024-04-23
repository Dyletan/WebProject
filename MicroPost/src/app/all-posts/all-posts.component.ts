import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostsService} from "../services/posts.service";
import {Category} from '../models/category';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../services/user.service";
import { LikeService } from '../services/like.service';
import { Like } from '../models/like';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})

export class AllPostsComponent implements OnInit {
  posts!: Post[];
  categories!: Category[];
  likesCounts: number[] = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute, private userService: UserService, private likeService: LikeService) {
  }

  ngOnInit() {
    this.getPosts();
    this.getCategories();
    this.getLikes();
    console.log(this.likesCounts[2])
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts.reverse();
    });
  }

  getCategories() {
    this.postsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getPostCategory(category_id: number): string {
    const category: Category | undefined = this.categories.find((category) => {
      return category.id === +category_id;
    });
    console.log()
    if (category && category.name) {
      return category.name;
    } else {
      return 'Category Not Found';
    }
  }

  // getPostLikes(post_id: number): Observable<number> {
  //   console.log(this.postsService.getPostLikes(post_id).subscribe())
  //   let likes_count: number;
  //   this.postsService.getPostLikes(post_id).subscribe(response => {
  //     likes_count=response.likes_count
  //   });
  //   return likes_count;
  // }

  getLikes(){
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.posts.forEach(post => {
        if (post.id !== undefined) {
          this.likeService.getPostLikes(post.id).subscribe(likes => {
            if (post.id !== undefined) {
              this.likesCounts[post.id] = likes.likes_count;
            }
          });
        }
      });
    });
  }

  putLike(post_id: number) {
    const like: Like = {user_id: this.userService.get_user_id(), post_id: post_id}
    let likeExists: boolean;
    this.likeService.checkPostLike(like).subscribe(response => {
      likeExists =response.liked;
      console.log(likeExists);
      console.log(like);
    if (likeExists) {
      this.likeService.deletePostLike(like).subscribe()
    } else {
      this.likeService.addPostLike(like).subscribe()
    }
    });
  }
}
