import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostsService} from "../services/posts.service";
import {Category} from '../models/category';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../services/user.service";
import {LikeService} from '../services/like.service';
import {Like} from '../models/like';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css'
})

export class AllPostsComponent implements OnInit {
  posts!: Post[];
  categories: Category[] = [];

  constructor(private postsService: PostsService, private route: ActivatedRoute, private userService: UserService, private likeService: LikeService) {
  }

  ngOnInit() {
    this.getPosts();
    this.getCategories();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts.reverse();
      this.posts.forEach(post => {
        if (post.id) {
          this.likeService.isPostLiked(post.id).subscribe(
            (isLiked: boolean) => {
              post.is_liked = isLiked; // Set is_liked property based on result
            },
            (error) => {
              console.error(`Error checking if post ${post.id} is liked:`, error);
            }
          );
        }
      });
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
    if (category && category.name) {
      return category.name;
    } else {
      return 'Category Not Found';
    }
  }

  toggleLike(post: Post): void {
    if (post.id) {
      if (post.is_liked) {
        this.likeService.unlikePost(post.id).subscribe(
          () => {
            post.is_liked = false;
          },
          (error) => {
            console.error('Error unliking post:', error);
          }
        );
      } else {
        this.likeService.likePost(post.id).subscribe(
          () => {
            post.is_liked = true;
          },
          (error) => {
            console.error('Error liking post:', error);
          }
        );
      }
    }
  }
}

